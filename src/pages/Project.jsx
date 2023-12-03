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
		return project;
	};

	// Use the useQuery hook to fetch data
	const {
		data: project,
		isLoading,
		error,
	} = useQuery(["project", id], fetchProject, {
		enabled: !!id, // This ensures the query runs only if id is available
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
		<Card>
			<div>
				<h2>Project Details</h2>
				{project ? (
					<div>
						<p>
							<strong>Name:</strong> {project.name}
						</p>
						<p>
							<strong>Pay Rate:</strong> ${project.payrate}
						</p>
						{/* Render more project details as needed */}
					</div>
				) : (
					<p>Project not found</p>
				)}
			</div>
		</Card>
	);
}
