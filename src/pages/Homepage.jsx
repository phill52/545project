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
import { fetchProjectByID, fetchCurrentProjectID } from "../fetchFunctions";

export default function Homepage() {
	const {
		data: currentProjectId,
		isLoading,
		error,
	} = useQuery("currentProject", fetchCurrentProjectID);

	const {
		data: currentProject,
		isLoading: isLoadingProject,
		error: errorProject,
	} = useQuery(
		["project", currentProjectId],
		() => fetchProjectByID(currentProjectId),
		{
			enabled: !!currentProjectId && !isNaN(currentProjectId), // This ensures the query runs only if id is available
		}
	);

	console.log(currentProject);
	if (isLoading) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div>Error: {error.message}</div>;
	} else if (currentProjectId === null) {
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
				<h2 className="text-darkviolet font-bold font-underline text-4xl pb-4 pt-8">
					{/* {currentProject.name} */}
				</h2>
				{/* {isLoadingShifts ? (
					<div>Loading...</div>
				) : errorShifts ? (
					<div>Error: {errorShifts.message}</div>
				) : shifts.length > 0 || !shifts[0].end ? (
					<p>hello</p>
				) : (
					<div className="bg-lightgreen rounded-[30px] text-center text-cream text-4xl py-3.5">
						Resume
					</div>
				)} */}

				<div className="flex flex-row mt-2 mb-6">
					<div>
						<ul className="text-left text-darkviolet text-4xl w-full">
							<li>Last ended at 12:30</li>
							<li>Total time: 5 hours, 30 minutes</li>
							<li>Pay rate: 10$</li>
						</ul>
					</div>

					<div className="flex flex-col w-[60%]">
						<div className="bg-lightorange rounded-[30px] text-3xl mb-2 py-1.5 text-darkviolet">
							Invite Another Member
						</div>
						<div className="bg-brightyellow rounded-[30px] text-3xl py-16 text-darkviolet">
							Switch Project
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
