import React from "react";
import { Link } from "react-router-dom";

import defaultAvatar from './../../assets/images/d-user.jpg'

import "./topnav.scss";

function TopNav() {
	return (
		<header>
			<div>

			</div>
			<nav>
				<ul>
					<li> 
						<Link to="notifications" className="navbarLink">
							Notifications
						</Link>
					</li>
					<li>
						<Link to="notifications" className="navbarLink">
							Settings
						</Link>
					</li>
				</ul>
				<div className="avatarContainer">
					<img src={defaultAvatar} alt="Default User" className="avatarImage"></img>
				</div>
			</nav>	
		</header>
	);
}

export default TopNav;
