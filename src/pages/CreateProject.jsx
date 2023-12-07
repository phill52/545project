import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { db } from "../models/db.js";
import { useQuery } from "react-query";
import { generateRandomId } from "../utilFunctions";
import { useNavigate } from "react-router-dom";

export default function Project() {
	const [projectName, setProjectName] = useState("");
	const [payrate, setPayrate] = useState(0);
	const [buttonText, setButtonText] = useState("Create Project");
	const [buttonColor, setButtonColor] = useState("bg-brightyellow");

	// Function to change the button color and text
	const handleButtonChange = () => {
		setButtonColor("bg-green-300");
		setButtonText("Created Project");
		setTimeout(() => {
			setButtonColor("bg-brightyellow");
			setButtonText("Create Project");
		}, 500);
	};

	// Function to handle the form input
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Printing out the project name and the payrate in the console
		console.log(`Project name ${projectName}`);
		console.log(`Payrate ${payrate}`);
		// Storing the project name and the the payrate into the db
		try {
			// Preventing the user from adding a project with an empty name
			if (projectName.trim() === "")
				throw new Error("Project name cannot be empty");
			handleButtonChange();
			const projectID = await db.projects.add({
				id: generateRandomId(),
				name: projectName,
				payrate: parseInt(payrate),
				shifts: [],
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
						Create a New Project
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
									value={buttonText}
									disabled={buttonText === "Created Project"}
									className={`
									${buttonColor}
									text-3xl
									py-2
									px-4
									rounded-full
									h-24
									w-5/6
									hover:cursor-pointer
									hover:underline
									`}
								/>
							</div>
						</form>
					</div>
				</div>
			</Card>
		</div>
	);
}
