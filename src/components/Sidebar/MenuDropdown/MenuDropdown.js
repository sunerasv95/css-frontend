import SidebarLink from "../SidebarLink/SidebarLink";
import "./_menu-dropdown.scss";

function MenuDropdown({ dropdown, subMenuItems }) {
	return dropdown ? (
		<div className="dropdownCollapse">
			<div className="subNavList">
				{subMenuItems
					? subMenuItems.map((subItem) => {
							return (
								<SidebarLink path={subItem.menuUrl}>
									<span> {subItem.label}</span>
								</SidebarLink>
							);
					  })
					: null}
			</div>
		</div>
	) : null;
}

export default MenuDropdown;
