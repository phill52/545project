import Dexie from "dexie";
import { seed } from "./seed.js";
export const db = new Dexie("myDb");
db.version(1).stores({
	projects: "++id, name, payrate, shifts",
	shifts: "++id, project, start, end",
	currentproject: "++id",
});
db.on("populate", seed);
