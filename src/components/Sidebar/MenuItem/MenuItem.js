import { useState } from "react";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import SidebarLink from "../SidebarLink/SidebarLink";
import "./_menu-item.scss";

function MenuItem({ menuPath, icon, label, subMenu }) {
	const [dropdown, setDropdown] = useState(false);

	const showDropdown = () => setDropdown(!dropdown);

	return (
		<>
			<SidebarLink path={menuPath}>
				<div onClick={subMenu && showDropdown}>
					<i className={icon}></i>
					<span>{label}</span>
				</div>
				{subMenu ? (
					<div>
						{dropdown ? (
							<i className="bi bi-chevron-up"></i>
						) : (
							<i className="bi bi-chevron-down"></i>
						)}
					</div>
				) : null}
			</SidebarLink>
			{subMenu ? (
				<MenuDropdown dropdown={dropdown} key={Math.floor((Math.random() * 100) + 4000)} subMenuItems={subMenu} />
			) : null}
		</>
	);
}

export default MenuItem;
