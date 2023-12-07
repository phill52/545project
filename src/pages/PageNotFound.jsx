import React from "react";
import Card from "../components/Card.jsx";

export default function PageNotFound() {
	return (
		<div className="flex flex-col justify-center align-center h-screen home-grad px-[12%]">
			<Card>
				<div className="p-10">
					<h1 className="text-7xl font-bold text-red-500 text-center mb-3">
						404
					</h1>
					<p>Page does not exist</p>
					<a
						href="/"
						className="text-blue-500 hover:text-blue-900 transition-colors duration-300 underline p-1"
					>
						Go back?
					</a>
				</div>
			</Card>
		</div>
	);
}
