import { Link } from "react-router-dom";

import "./_sidebar-link.scss";

function SidebarLink({ children, path }) {
	return path ? (
		<Link to={path} className="SidebarLink">
			{children}
		</Link>
	) : (
		<div className="SidebarLink">{children}</div>
	);
}

export default SidebarLink;
