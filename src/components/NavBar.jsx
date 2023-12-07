import React from "react";

const NavBar = () => {
	return (
		<nav className="flex items-center bg-cream h-16">
			<ul className="flex flex-wrap justify-center items-center">
				<li className="text-4xl font-bold text-darkviolet mx-3">
					WorkWind
				</li>
				<li className="mx-3 text-2xl hover:underline text-darkviolet">
					<a href="/">Home</a>
				</li>
				<li className="mx-3 text-2xl hover:underline text-darkviolet">
					<a href="/Projects">Projects</a>
				</li>
				<li className="mx-3 text-2xl hover:underline text-darkviolet">
					<a href="/Project/Create">Create a Project</a>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
