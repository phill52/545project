import { db } from "./models/db";
import { timeElapsed, formatDateTime } from "./utilFunctions";

const fetchProjectByID = async (id) => {

const fetchProjectByID = async (id) => {
	console.log("hello");
	if (isNaN(id)) {
		throw new Error("Project ID must be a number");
	}
	if (typeof id !== "number") {
		id = parseInt(id);
	}
	const project = await db.projects.get(id);
	let shifts = [];
	for (let id of project.shifts) {

		let shift = await db.shifts.get(id);
		shifts.push(shift);
	}
	project.shifts = shifts;
	return project;
};

const fetchCurrentProjectID = async () => {
	let currentProjectId = await db.currentproject.toArray();
	currentProjectId = currentProjectId[0];
	const currentProjectId = await db.currentproject.get(1);
	if (currentProjectId) {
		return currentProjectId;
	} else {
		return null;
	}
};

const fetchCurrentProject = async () => {
	const currentProjectId = await fetchCurrentProjectID();
	if (currentProjectId) {
		const currentProject = await fetchProjectByID(currentProjectId.id);
		return currentProject;
	} else {
		return null;
	}
};

const fetchAllProjects = async () => {
	const projects = await db.projects.toArray();

	const projectsWithTimeElapsedPromises = projects.map(async (project) => {
		const fullProject = await fetchProjectByID(project.id);
		const totalTime = timeElapsed(fullProject.shifts);
		const lastEnded =
			fullProject.shifts.length > 0
				? fullProject.shifts[fullProject.shifts.length - 1].end
					? `Last ended at ${formatDateTime(
							fullProject.shifts[fullProject.shifts.length - 1]
								.end
					  )}`
					: `Currently working since ${formatDateTime(
							fullProject.shifts[fullProject.shifts.length - 1]
								.start
					  )}`
				: "No shifts recorded";
		return {
			...project,
			totalTime,
			lastEnded,
		};
	});

	const projectsWithTimeElapsed = await Promise.all(
		projectsWithTimeElapsedPromises
	);
	return projectsWithTimeElapsed;
};

export {
	fetchProjectByID,
	fetchCurrentProjectID,
	fetchCurrentProject,
	fetchAllProjects,
};
export { fetchProjectByID, fetchCurrentProjectID, fetchCurrentProject };
