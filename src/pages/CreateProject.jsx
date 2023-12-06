import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { db } from "../models/db.js";
import { useQuery } from "react-query";

export default function Project() {
	const [projectName, setProjectName] = useState("");
	const [payrate, setPayrate] = useState(0);

	// Function to handle the form input
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Printing out the project name and the payrate in the console
		console.log(`Project name ${projectName}`);
		console.log(`Payrate ${payrate}`);
		// Storing the project name and the the payrate into the db
		try {
			const projectID = await db.projects.add({
				name: projectName,
				payrate: payrate,
			});
			console.log(`Project ${projectID} added successfully`);
			// Reseting the form after a sucessful insert
			setProjectName("");
			setPayrate(0);
		} catch (e) {
			console.log(`Failure to insert data: ${e}`);
		}
	};

	return (
		<div className="flex flex-col justify-center align-center h-screen home-grad px-[12%]">
			<Card>
				<div className="p-6">
					<h2 className="text-5xl font-bold text-darkviolet text-left">
						Create a new Project
					</h2>
					<div className="flex flex-col w-full rounded-lg text-left px-4 pt-12">
						<form
							className="space-y-4"
							id="create-project-from"
							onSubmit={handleSubmit}
						>
							<div className="text-center flex flex-col">
								<label className="text-2xl font-bold text-left">
									Project Name
								</label>
								<input
									id="projectName"
									className="mx-2 mt-4 border-2 border-blue-500 h-12"
									name="projectName"
									type="text"
									placeholder="New Project"
									value={projectName}
									onChange={(e) =>
										setProjectName(e.target.value)
									}
								/>
							</div>
							<div className="text-center flex flex-col">
								<label className="text-2xl font-bold text-left">
									Payrate
								</label>
								<input
									id="payrate"
									className="mx-2 mt-4 border-2 border-blue-500 h-12"
									name="payrate"
									type="number"
									placeholder="1"
									value={payrate}
									onChange={(e) => setPayrate(e.target.value)}
								/>
							</div>
							<div className="flex justify-center pt-10">
								<input
									type="submit"
									value="Create Project"
									className="
							bg-brightyellow
                            text-3xl
							py-2
							px-4
							rounded-full
                            h-24
                            w-5/6
                            "
								/>
							</div>
						</form>
					</div>
				</div>
			</Card>
		</div>
	);
}
