import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { db } from "../models/db.js";
import { useQuery } from "react-query";

export default function Project() {
	const { id } = useParams();

	// Define the function to fetch project data
	const fetchProject = async () => {
		if (isNaN(id)) {
			throw new Error("Project ID must be a number");
		}
		const project = await db.projects.get(parseInt(id));
		let shifts = [];
		console.log(project);
		for (let id of project.shifts) {
			let shift = await db.shifts.get(parseInt(id));
			shifts.push(shift);
		}
		project.shifts = shifts;
		return project;
	};

	const {
		data: project,
		isLoading,
		error,
	} = useQuery(["project", id], fetchProject, {
		enabled: !!id && !isNaN(id), // This ensures the query runs only if id is available
	});

	// Loading state
	if (isLoading) {
		return <div>Loading...</div>;
	}

	// Error state
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	const timeElapsed = (shifts) => {
		//calculates the time and returns it as hours and minutes
		let total = 0;
		for (let shift of shifts) {
			total += shift.end - shift.start;
		}
		total = Math.floor(total / 1000);
		total = Math.floor(total / 3600);
		let minutes = Math.floor((total / 60) % 60);
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		total = `${total} hours, ${minutes} minutes`;
		return total;
	};

	const totalPay = (shifts, payrate) => {
		//calculates the total pay for the project
		let total = 0;
		for (let shift of shifts) {
			total += shift.end - shift.start;
		}
		total = Math.floor(total / 1000);
		total = Math.floor(total / 3600);
		total = total * payrate;
		return total;
	};

	const formatDateTime = (date) => {
		// Pad with a zero if the number is less than 10
		function pad(number) {
			return number < 10 ? "0" + number : number;
		}

		let month = pad(date.getMonth() + 1); // getMonth() returns months from 0-11
		let day = pad(date.getDate());
		let year = date.getFullYear();
		let hour = date.getHours() % 12;
		let minute = pad(date.getMinutes());
		let period = hour > 12 ? "PM" : "AM";
		return `${month}/${day}/${year} ${hour}:${minute} ${period}`;
	};

	const hoursDifference = (datetime1, datetime2) => {
		//outputs 6.2
		// Calculate difference in milliseconds
		let differenceInMilliseconds = Math.abs(datetime1 - datetime2);
		// Convert milliseconds to hours and round to two decimal places
		let differenceInHours = (
			differenceInMilliseconds /
			(1000 * 60 * 60)
		).toFixed(2);
		return `${differenceInHours} hours`;
	};

	const hoursDifference2 = (datetime1, datetime2) => {
		//outputs '6 hours, 12 minutes'
		// Calculate the absolute difference in milliseconds
		let differenceInMilliseconds = Math.abs(datetime1 - datetime2);

		// Convert milliseconds to minutes and hours
		let totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
		let hours = Math.floor(totalMinutes / 60);
		let minutes = totalMinutes % 60;

		return `${hours} hours, ${minutes} minutes`;
	};

	// Render project data
	return (
		<main>
		<Card>
			<div className="my-8">
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
								<strong>Pay Rate:</strong> {project.payrate}$/hr
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
									<p>{formatDateTime(shift.end)}</p>
									<p>
										{hoursDifference(
											shift.start,
											shift.end
										)}
									</p>
								</div>
							))}
							<div className="flex justify-center rounded-2xl w-full bg-brightyellow">
								<p className="text-2xl my-4">
									Total Time: {timeElapsed(project.shifts)}
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
