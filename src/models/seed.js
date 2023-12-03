import { db } from "./db";

export async function seed() {
	const projectId = await db.projects.add({
		id: 1,
		name: "Project 1",
		payrate: 10,
		shifts: [1, 2],
	});
	await db.shifts.add({
		id: 1,
		project: projectId,
		start: new Date("2020-01-01T09:00:00"),
		end: new Date("2020-01-01T17:00:00"),
	});
	await db.shifts.add({
		id: 2,
		project: projectId,
		start: new Date("2020-01-02T09:00:00"),
		end: new Date("2020-01-02T17:00:00"),
	});
}
