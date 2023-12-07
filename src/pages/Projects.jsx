import React from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { db } from "../models/db.js";
import { useQuery, useQueryClient } from "react-query";
import { fetchAllProjects, fetchCurrentProjectID } from "../fetchFunctions";
import Project from "./Project";
import { useNavigate } from "react-router-dom";

export default function Projects() {
	const navigate = useNavigate();

	const {
		data: projects,
		isLoading,
		error,
	} = useQuery(["allprojects"], fetchAllProjects);

	const { data: currentProjectID } = useQuery(
		["currentProjectID"],
		fetchCurrentProjectID,
		{ refetchOnWindowFocus: true }, // ensures refetching when window regains focus
		{ refetchOnMount: true } // ensures refetching when component mounts
	);
	const queryClient = useQueryClient();

	const selectProject = async (id) => {
		console.log(id);
		try {
			await db.currentproject.clear();
			await db.currentproject.add({ id: id });
			queryClient.invalidateQueries("currentProjectID", {
				refetchActive: true,
			});
			queryClient.invalidateQueries("currentProject", {
				refetchActive: true,
			});
		} catch (error) {
			console.log(error);
		}
		queryClient.invalidateQueries("currentProject");
		navigate(`/`);
	};

	const deleteProject = async (id) => {
		console.log(id);
		try {
			await db.projects.delete(id);
			if (currentProjectID.id === id) {
				await db.currentproject.clear();
			}
		} catch (error) {
			console.log(error);
		}
		queryClient.invalidateQueries("allprojects", { refetchActive: true });
	};

	const ProjectCard = ({ project }) => {
		return (
			<Card>
				<a href={`/project/${project.id}`}>
					<h2 className="text-darkviolet font-bold font-underline text-4xl pb-4 pt-8 hover:cursor-pointer hover:underline">
						{project.name}
					</h2>
				</a>
				{currentProjectID && project.id === currentProjectID.id ? (
					<div className="bg-brightyellow rounded-[30px] text-center text-darkviolet text-4xl py-3.5 hover:cursor-ponter hover:underline">
						Current Project
					</div>
				) : (
					<div
						onClick={() => selectProject(project.id)}
						className="bg-lightgreen rounded-[30px] text-center text-cream text-4xl py-3.5 hover:cursor-ponter hover:underline"
					>
						Select Project
					</div>
				)}

				<div className="flex flex-row mt-2 mb-6">
					<div>
						<ul className="text-left text-darkviolet text-4xl w-full">
							<li>Last ended at {project.lastEnded}</li>
							<li>Total time: {project.totalTime}</li>
							<li>Pay rate: {project.payrate}</li>
						</ul>
					</div>

					<div className="flex flex-col w-[60%]">
						<div
							className="bg-brightyellow rounded-[30px] text-3xl py-16 text-darkviolet"
							onClick={() => deleteProject(project.id)}
						>
							Delete Project
						</div>
					</div>
				</div>
			</Card>
		);
	};

	const CardList = ({ items }) => {
		if (!items) {
			return null;
		}
		return (
			<div>
				<div>
					{items.map((item) => (
						<ProjectCard key={item.id} project={item} />
					))}
				</div>
			</div>
		);
	};

	// Loading state
	if (isLoading) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
			<div className="flex flex-col  align-center h-screen home-grad px-[12%]">
				<div className="my-10">
					<Card>
						<h1
							className="text-darkviolet font-light text-5xl"
							style={{
								textShadow: "0px 3px 3px rgba(0, 0, 0, 0.4)",
							}}
						>
							Projects
						</h1>
					</Card>
				</div>

				{projects ? (
					<CardList items={projects} />
				) : (
					<div className="flex flex-col justify-center align-center h-screen home-grad px-[12%]">
						<Card>
							<h2 className="text-darkviolet font-bold font-underline text-4xl pb-4 pt-8">
								No projects created
							</h2>
							<a href="/createproject">
								<div className="bg-darkblue rounded-[30px] text-center text-cream text-4xl py-3.5 hover:cursor-pointer hover:underline">
									Create Project
								</div>
							</a>
						</Card>
					</div>
				)}
			</div>
		);
	}
}
