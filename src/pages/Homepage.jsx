import React from "react";
import Card from "../components/Card";
import { useQuery } from "react-query";
import { db } from "../models/db.js";
import {
	formatDateTime,
	hoursDifference,
	totalPay,
	timeElapsed,
} from "../utilFunctions";
import { fetchCurrentProject } from "../fetchFunctions";

export default function Homepage() {
	const {
		data: currentProject,
		isLoading,
		error,
	} = useQuery(["currentProject"], fetchCurrentProject);

	console.log(currentProject);

	if (isLoading) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div>Error: {error.message}</div>;
	} else if (currentProject === null) {
		return (
			<div className="flex flex-col justify-center align-center h-screen home-grad px-[12%]">
				<Card>
					<h2 className="text-darkviolet font-bold font-underline text-4xl pb-4 pt-8">
						No project selected
					</h2>
					<a href="/createproject">
						<div className="bg-darkblue rounded-[30px] text-center text-cream text-4xl py-3.5">
							Create Project
						</div>
					</a>
					<br />
					<a href="/viewprojects">
						<div className="bg-brightyellow rounded-[30px] text-center text-olive text-4xl py-3.5">
							View Projects
						</div>
					</a>
				</Card>
			</div>
		);
	}
	return (
		<div className="flex flex-col justify-center align-center h-screen home-grad px-[12%]">
			<Card>
				<a
					href={`/project/${currentProject.id}`}
					className="text-darkviolet font-bold text-4xl pb-4 pt-8 hover:underline hover:cursor-pointer"
				>
					{currentProject.name}
				</a>
				<div className="flex flex-row mt-2 mb-6">
					<div>
						<ul className="text-left text-darkviolet text-4xl w-full">
							<li>
								{/* Last ended at {currentProject.shifts[0].end} */}
							</li>
							<li>
								Total time: {timeElapsed(currentProject.shifts)}
							</li>
							<li>Pay Rate:{currentProject.payrate}</li>
							<li>
								Total Pay:{" "}
								{totalPay(
									currentProject.shifts,
									currentProject.payrate
								)}
								$
							</li>
						</ul>
					</div>

					<div className="flex flex-col w-[60%]">
						<a href="/projects">
							<div className="bg-brightyellow rounded-[30px] text-3xl py-16 text-darkviolet hover:cursor-pointer">
								Switch Project
							</div>
						</a>
					</div>
				</div>
			</Card>
		</div>
	);
}
