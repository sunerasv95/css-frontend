import { useEffect, useState, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTable } from "react-table";
import { FormInput, Button, Badge } from "./../components/ui";
import PageHeading from "../components/PageHeading/PageHeading";
import axios from "../api/axios";
import Accordion from "../components/Accordion/Accordion";
import ReactDataTable from "../components/ReactDataTable/ReactDataTable";

const statusOpts = [
	{ value: 1, option: "Enable" },
	{ value: 0, option: "Disable" },
];

const initialFormValues = {
	defName: "",
	defParent: 0,
	defStatus: 0,
};

const CREATE_MODE = "CREATE";
const EDIT_MODE = "EDIT";

const Category = () => {
	const [categories, setCategories] = useState([]);
	const [parentCategories, setParentCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmited, setIsSubmited] = useState(false);
	const [error, setError] = useState();
	const [name, setName] = useState(initialFormValues.defName);
	const [parent, setParent] = useState(initialFormValues.defParent);
	const [status, setStatus] = useState(initialFormValues.defStatus);
	const [selectedId, setSelectedId] = useState();
	const [formMode, setFormMode] = useState(CREATE_MODE);

	const categoryTableColumns = useMemo(
		() => [
			{
				Header: "Category Name",
				accessor: "name",
			},
			{
				Header: "Parent Category",
				accessor: "parent",
				Cell: ({ cell }) => {
					const parent = cell.row.values.parent;
					//console.log("parent cell", parent);
					return <label>{parent?.name ?? "No Parent"}</label>;
				},
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell }) => {
					const val = cell.row.values.status;
					return (
						<label>
							{val === 1 ? (
								<Badge badgeColor="success" text="Enabled" />
							) : val === 0 ? (
								<Badge badgeColor="danger" text="Disabled" />
							) : (
								"N/A"
							)}
						</label>
					);
				},
			},
			{
				Header: "Actions",
				accessor: "id",
				Cell: ({ cell }) => {
					const itemId = cell.row.values.id;
					//console.log("item", cell.row.values.id);
					return (
						<Button
							small
							clicked={(e) => onEditHandler(e, itemId)}
							buttonColor="warning"
						>
							Edit
						</Button>
					);
				},
			},
		],
		[]
	);

	useEffect(() => {
		setIsLoading(true);
		let isMounted = true;
		const controller = new AbortController();
		const signal = controller.signal;

		const fetchCategoriesApi = async () => {
			try {
				const response = await axios.get("/categories", { signal });
				const cats = response?.data?.result;
				isMounted && setCategories(cats);
				// console.log("data", cats);
			} catch (error) {
				console.error(error);
			}
		};

		fetchCategoriesApi();

		return () => {
			isMounted = false;
			controller.abort();
			setIsLoading(false);
		};
	}, []);

	useEffect(() => {
		setIsLoading(true);
		const controller = new AbortController();
		const signal = controller.signal;

		const fetchCategoryApi = async () => {
			try {
				const response = await axios.get(`/categories/${selectedId}`, {
					signal,
				});
				const cat = response?.data?.result;
				console.log("get cat", cat);
				if (cat) {
					const { name, status, parent } = cat;
					const parentId = Object.keys(parent).length !== 0 ? parent.id : 0;
					setName(name);
					setParent(parentId);
					setStatus(status);
				}
			} catch (error) {
				console.error(error);
			}
		};

		selectedId && fetchCategoryApi();

		return () => {
			//setSelectedId();
			controller.abort();
			setIsLoading(false);
		};
	}, [selectedId]);

	useEffect(() => {
		const parents = parentCategoryFilterHandler(categories);
		//console.log("set parentssssss", parents);
		setParentCategories(parents);
	}, [categories]);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		// console.log("submited!");
		try {
			if (name === undefined || parent === undefined || status === undefined) {
				setError("All values are required!");
				return;
			}
			const data = {
				name,
				parent,
				isActived: status,
			};
			console.log("data", data);
			if (formMode === EDIT_MODE) {
				const response = await axios.put(`/categories/${selectedId}`, data);
				const updatedCategory = response?.data?.result;
				const { id, name, status, parent } = updatedCategory;
				const categoryArr = [...categories];
				const updatedArr = categoryArr.map(cat => {
					if (cat.id === id) return { ...cat, id, name, status, parent };
					return cat;
				});
				console.log("result", updatedArr);
				setCategories(updatedArr);
			} else {
				const response = await axios.post("/categories", data);
				const newCategory = response?.data?.result;
				const categoryArr = [...categories];
				categoryArr.push(newCategory);
				setCategories(categoryArr);
			}
			//formResetHandler();
		} catch (error) {
			console.error(error);
		}
	};

	const onEditHandler = async (e, selectedId) => {
		e.preventDefault();
		//console.log("edit id", selectedId);
		setSelectedId(selectedId);
		setFormMode(EDIT_MODE);
	};

	const formResetHandler = async () => {
		setName(initialFormValues.defName);
		setParent(initialFormValues.defParent);
		setStatus(initialFormValues.defStatus);
		setFormMode(CREATE_MODE);
		setSelectedId();
	};

	const parentCategoryFilterHandler = (cats) => {
		let categoriesArr = [...cats];
		const returnItems = categoriesArr
			.filter((cat) => Object.keys(cat.parent).length === 0)
			.map((c) => {
				return { value: c.id, option: c.name };
			});
		returnItems.unshift({ value: 0, option: "No Parent" });
		return returnItems;
	};

	return (
		<Container>
			<Row>
				<Col md={12}>
					<PageHeading title="Categories" />
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<form onSubmit={onSubmitHandler}>
						<FormInput
							elementId="category_name"
							elementName="category_name"
							labelName="Category Name"
							elementValue={name}
							changed={(e) => setName(e.target.value)}
						/>
						<FormInput
							inputType="select"
							options={parentCategories}
							elementId="category_status"
							elementName="category_status"
							labelName="Parent Category"
							elementValue={parent}
							changed={(e) => setParent(e.target.value)}
						/>
						<FormInput
							inputType="select"
							options={statusOpts}
							elementId="category_status"
							elementName="category_status"
							labelName="Status"
							elementValue={status}
							changed={(e) => setStatus(e.target.value)}
						/>
						<Button
							buttonMode="submit"
							buttonColor={formMode === EDIT_MODE ? "warning" : "primary"}
							block
						>
							{" "}
							{formMode === EDIT_MODE ? "Update" : "Create"}
						</Button>
						{formMode === EDIT_MODE ? (
							<Button
								buttonMode="button"
								buttonColor="secondary"
								block
								clicked={() => formResetHandler()}
							>
								Discard
							</Button>
						) : null}
					</form>
				</Col>
				<Col md={8}>
					<h5>All Categories</h5>
					<ReactDataTable 
						data={categories} 
						columns={categoryTableColumns} 
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Category;
