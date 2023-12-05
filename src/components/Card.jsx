import React from "react";

export default function Card({ children }) {
	return (
		<div className="bg-cream rounded-lg text-center px-[12%] py-8">
			{children}
		</div>
	);
}
