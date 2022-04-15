import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, FormInput} from './../../components/ui';
import useAuth from "../../hooks/useAuth";
import axios from "./../../api/axios";
import "./login.scss";

const LOGIN_URL = "/auth/login";

function Login() {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);

	const [error, setError] = useState("");

	useEffect(() => {
		let isValid = loginFormValidate(username);
		setValidUsername(isValid);
	}, [username]);

	useEffect(() => {
		let isValid = loginFormValidate(password);
		setValidPassword(isValid);
	}, [password]);

	const loginFormValidate = (value) => {
		//console.log("val", value);
		let isValid = false;

		if (value.trim() !== "") {
			isValid = true;
		}

		return isValid;
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		if (username === "" || password === "") {
			setError("Please provide both values!");
			return;
		}
		resetForm();

		try {
			const data = {
				email: username,
				pass: password,
			};
			const response = await axios.post(LOGIN_URL, data);
			const accessToken = response?.data.access_token;
			setAuth({ username, accessToken });
			// alert("Login success!");
			navigate(from, { replace: true });
		} catch (error) {
			console.log("err", error);
			if (!error?.response) {
				setError("No server response!");
			} else if (error?.response?.status === 401) {
				setError("Invalid Username or Password");
			} else if (error?.response?.status === 400) {
				setError("Username and Password are required");
			} else {
				setError("Login failed!");
			}
		}
	};

	const resetForm = () => {
		setError("");
		setUsername("");
		setPassword("");
	};

	return (
		<div className="LoginContainer">
			<div className="LoginFormContainer">
				<div>
					<p>Login</p>
				</div>
				{error ? (
					<div className="FormErrorContainer">
						<span>{error}</span>
					</div>
				) : null}
				<form onSubmit={submitHandler}>
					<FormInput
						type="text"
						elementId="username"
						elementName="username"
						labelName="Username"
						elementValue={username}
						changed={(e) => setUsername(e.target.value)}
					/>
					<FormInput
						type="text"
						elementId="password"
						elementName="password"
						labelName="Password"
						elementValue={password}
						changed={(e) => setPassword(e.target.value)}
					/>
					<Button 
						buttonMode="submit"
						disable={!(validUsername && validPassword)}
						block
					>Submit</Button>
					<a>
						<small>Forget Password</small>
					</a>
				</form>
			</div>
		</div>
	);
}

export default Login;
