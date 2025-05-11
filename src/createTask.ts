import { Task } from "./Task";
import { generateId } from "./generateId";
import { now } from "./now";

export function createTask(
  title : string ,
  description : string ,
  db : Array<Task>
) : void {
  const task = new Task(
    {
      title: title,
      taskId: generateId( db ),
      description: description,
      creationDate: now(),
      status: "open"
    }
  );
  db.push( task );
}
