import Dexie from 'dexie'; 
export const db = new Dexie('myDb');
db.version(1).stores({
    projects: '++id, name, payrate, shifts',
    shifts: '++id, project, start, end',
    currentproject: '++id'
})