import { useState } from "react";
import MenuItem from "./MenuItem/MenuItem";

import "./sidebar.scss";

function Sidebar() {

	const [menuItems, setMenuItems] = useState([
		{
			label: "Dashboard",
			icon: "bi bi-house",
			menuUrl: "/",
		},
		{
			label: "Listings",
			icon: "bi bi-view-list",
			subMenu: [
				{
					label: "All Listings",
					icon: "bi bi-view-list",
					menuUrl: "/listings",
				},
				{
					label: "Add New Listing",
					icon: "bi bi-card-list",
					menuUrl: "/new-listing",
				},
			],
		},
		{
			label: "Users",
			icon: "bi bi-people",
			subMenu: [
				{
					label: "All Users",
					icon: "bi bi-people",
					menuUrl: "/users",
				},
				{
					label: "Add New User",
					icon: "bi bi-person-plus",
					menuUrl: "/new-user",
				},
			],
		},
		{
			label: "Categories",
			icon: "bi bi-tags",
			menuUrl: "/categories",
		},
		{
			label: "Reports",
			icon: "bi bi-graph-up",
			menuUrl: "/reports",
		},
	]);

	return (
		<aside className="sidebarContainer">
			<div className="logoContainer">
				<span>Admin Panel</span>
			</div>
			<div className="navListContainer">
				<div className="navList">
					{menuItems
						? menuItems.map((item, i) => {
								return (
									<MenuItem
										key={2000+i}
										menuPath={item.menuUrl ?? null}
										icon={item.icon}
										label={item.label}
										subMenu={item.subMenu ?? null}
									/>
								);
						  })
						: null
					}
				</div>
			</div>
		</aside>
	);
}

export default Sidebar;
