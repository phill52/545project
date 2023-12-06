import React from "react";
import Card from "../components/Card";
import { useQuery, useQueryClient } from "react-query";
import { db } from "../models/db.js";
import { generateRandomId } from "../utilFunctions";
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
	} = useQuery(
		["currentProject"],
		fetchCurrentProject,
		{ refetchOnWindowFocus: true }, // ensures refetching when window regains focus
		{ refetchOnMount: true } // ensures refetching when component mounts
	);

	const queryClient = useQueryClient();

	const shifts = currentProject ? currentProject.shifts : [];

	const onResume = async () => {
		const currentDate = new Date();
		const shiftId = generateRandomId();
		const currentShift = {
			id: shiftId,
			project: currentProject.id,
			start: currentDate,
			end: null,
		};

		try {
			// First, add the shift to the 'shifts' table
			await db.shifts.add(currentShift);
			// Then, retrieve the current project and update it with the new shift object
			// const currentProject = await db.projects.get(currentProject.id);
			if (currentProject) {
				let updatedShifts = [];
				if (currentProject.shifts) {
					for (let shift of currentProject.shifts) {
						updatedShifts.push(shift.id);
					}
				}
				updatedShifts.push(currentShift.id);
				// const updatedShifts = currentProject.shifts
				// 	? [...currentProject.shifts.id, currentShift.id]
				// 	: [currentShift];
				await db.projects.update(currentProject.id, {
					shifts: updatedShifts,
				});
			}

			// Invalidate the query to refresh data
			queryClient.invalidateQueries(["project", currentProject.id]);
			queryClient.invalidateQueries(["currentProject"]);
		} catch (error) {
			console.error("Error updating project and shifts:", error);
		}
	};

	const onPause = async () => {
		const currentDate = new Date();
		try {
			// Assuming the last shift object is stored in the project's shifts array
			const lastShift =
				currentProject.shifts[currentProject.shifts.length - 1];

			if (lastShift) {
				// Update the end time of the current shift
				const updatedShift = {
					...lastShift,
					end: currentDate,
				};

				// Update the shift in the 'shifts' table
				await db.shifts.update(lastShift.id, updatedShift);

				// Invalidate the query to refresh data
				queryClient.invalidateQueries(["project", currentProject.id]);
				queryClient.invalidateQueries(["currentProject"]);
			}
		} catch (error) {
			console.error("Error pausing shift:", error);
		}
	};

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
				<div className="flex flex-col mt-2 mb-6">
					{shifts.length === 0 || shifts[shifts.length - 1].end ? (
						<div
							className="bg-lightgreen rounded-[30px] text-center text-white text-4xl py-2.5 hover:cursor-pointer"
							onClick={onResume}
						>
							Resume
						</div>
					) : (
						<div
							className="bg-darkred w-full rounded-[30px] text-center text-white text-4xl py-2.5 hover:cursor-pointer"
							onClick={onPause}
						>
							Punch Out
						</div>
					)}
					<div className="flex flex-row my-4">
						<ul className="text-left text-darkviolet text-4xl w-full">
							<li>
								{/* {currentProject.shifts.length > 0
									? `Last ended at ${formatDateTime(
											shifts[shifts.length - 1].end
									  )}`
									: "No shifts recorded"} */}

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
						<div className="flex flex-col w-[60%]">
							<a href="/projects">
								<div className="bg-brightyellow rounded-[30px] text-3xl py-16 text-darkviolet hover:cursor-pointer">
									Switch Project
								</div>
							</a>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
