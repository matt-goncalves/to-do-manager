import { Task } from "../model/Task";

export function listTasks( db : Array<Task> ) : Array<string> {
  const tasks = db.map( task => {
    let checkbox = "[ ]";
    if ( task.getStatus() === "complete" ) {
      checkbox = "[✓]";
    }
    return `${task.getTaskId()}. ${checkbox} ${task.getTitle()}`;
  });
  return tasks;
}


