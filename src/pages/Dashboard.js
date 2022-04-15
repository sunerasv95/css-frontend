import PageHeading from "../components/PageHeading/PageHeading";
import StatsBoard from "../components/StatsBoard/StatsBoard";
import useAuth from "../hooks/useAuth";

import "./dashboard.scss";

function Dashboard() {
	const { auth } = useAuth();
	return (
			<div className="dashboard">
				<PageHeading title="Dashboard" />
				{/* <section>
					<h4 style={{ marginTop: '2rem' }}>Welcome {auth?.username}!</h4>
				</section> */}
				<section className="statsSection">
					<StatsBoard />
					<StatsBoard />
					<StatsBoard />
					<StatsBoard />
				</section>
			</div>
	);
}

export default Dashboard;
