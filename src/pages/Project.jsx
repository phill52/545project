import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { db } from "../models/db.js";
import { useQuery } from "react-query";
import { fetchProjectByID } from "../fetchFunctions";
import {
	formatDateTime,
	hoursDifference,
	totalPay,
	timeElapsed,
} from "../utilFunctions";

export default function Project() {
	const { id } = useParams();
	const projectId = parseInt(id, 10); // Use radix 10 for decimal numbers

	const {
		data: project,
		isLoading,
		error,
	} = useQuery(["project", projectId], () => fetchProjectByID(projectId), {
		enabled: !!projectId && !isNaN(projectId),
	});

	// Loading state
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// Error state
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	// Render project data
	return (
		<main>
			<Card>
				<div>
					{project ? (
						<div>
							<h2 className="text-4xl font-bold text-darkviolet">
								{project.name}
							</h2>
							<div className="flex flex-col w-full bg-[#FFF5EA] rounded-lg text-left px-4">
								<p>
									<strong>Time Elapsed:</strong>{" "}
									{timeElapsed(project.shifts)}
								</p>
								<p>
									<strong>Total Pay:</strong>{" "}
									{totalPay(project.shifts, project.payrate)}$
								</p>
								<p>
									<strong>Pay Rate:</strong> {project.payrate}
									$/hr
								</p>
								<h2 className="text-2xl font-bold self-center">
									Shifts
								</h2>
								<div className="flex justify-between">
									<p>Start Time</p>
									<p>End Time</p>
									<p>Hours</p>
								</div>
							</div>
							<div>
								{project.shifts.map((shift) => (
									<div
										key={shift.id}
										className="flex justify-between bg-darkgreen rounded-2xl text-cream text-lg px-4 py-2 my-4"
									>
										<p>{formatDateTime(shift.start)}</p>
										{!shift.end ? (
											<p>Currently working</p>
										) : (
											<div className="flex justify-between w-[53%]">
												<p>
													{formatDateTime(shift.end)}
												</p>
												<p>
													{hoursDifference(
														shift.start,
														shift.end
													)}
												</p>
											</div>
										)}
									</div>
								))}
								<div className="flex justify-center rounded-2xl w-full bg-brightyellow">
									<p className="text-2xl my-4">
										Total Time:{" "}
										{timeElapsed(project.shifts)}
									</p>
								</div>
							</div>
						</div>
					) : (
						<p>Project not found</p>
					)}
				</div>
			</Card>
		</main>
	);
}
