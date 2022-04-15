import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from './pages/Users';
import Category from './pages/Category';

import "./app.scss";
import Login from "./pages/Auth/Login";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import RequireAuth from "./routes/RequireAuth";
import AddListing from "./pages/AddListing";

function App() {
	return (
		<div className="appContainer">
			<Routes>
				<Route path="login" element={<Login />}></Route>

				<Route path="/" element={<MainLayout />} >
					<Route element={<RequireAuth />}>
						<Route path="/" element={<Dashboard />}></Route>
						<Route path="categories" element={<Category />}></Route>
						<Route path="users" element={<Users />}></Route>
						<Route path="new-listing" element={<AddListing />}></Route>
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
