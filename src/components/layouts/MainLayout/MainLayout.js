import { Outlet } from "react-router-dom";
import Sidebar from "../../Sidebar/Sidebar";
import TopNav from "../../TopNav/TopNav";

import "./main-layout.scss";

function MainLayout() {
	return (
		<div className="mainContainer">
			<Sidebar />
			<main className="pageContainer">
				<TopNav />
				<div className="pageContent">
                    <Outlet />
                </div>
			</main>
		</div>
	);
}

export default MainLayout;
