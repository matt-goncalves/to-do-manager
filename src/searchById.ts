import { Task } from "./Task";

export function searchById( id : string , db : Array<Task>) : Task | undefined {
  return db.find( task => {
    if ( task.getTaskId() === id ) {
      return task;
    }
  });
}
