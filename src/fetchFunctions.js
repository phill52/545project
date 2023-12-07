import { db } from "./models/db";

const fetchProjectByID = async (id) => {
	console.log("hello");
	if (isNaN(id)) {
		throw new Error("Project ID must be a number");
	}
	if (typeof id !== "number") {
		id = parseInt(id);
	}
	const project = await db.projects.get(id);
	console.log(project);
	let shifts = [];
	console.log("boop", project);
	for (let id of project.shifts) {
		console.log("blop", id);
		let shift = await db.shifts.get(id);
		shifts.push(shift);
	}
	project.shifts = shifts;
	return project;
};

const fetchCurrentProjectID = async () => {
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

export { fetchProjectByID, fetchCurrentProjectID, fetchCurrentProject };
