import { db } from "./models/db";

const fetchProjectByID = async (id) => {
	console.log("hello");
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

const fetchCurrentProjectID = async () => {
	const currentProjectId = await db.currentproject.get(1);
	if (currentProjectId) {
		return currentProjectId.project;
	} else {
		return null;
	}
};

export { fetchProjectByID, fetchCurrentProjectID };
