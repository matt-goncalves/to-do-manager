import { searchById } from "./searchById";
import { Task } from "./Task";

export function readTask( taskId : string , db : Array<Task>) : string {
  const task = searchById( taskId , db );
  if ( task ) {
    return (
`
--------------------------------------------------------------------------------
Title: ${task.getTitle()}
Description: ${task.getDescription()}
Creation date: ${task.getCreationDate()}
Status: ${task.getStatus()}
--------------------------------------------------------------------------------
`
    );
  } else {

    throw new Error(`Task ${taskId} does not exist.`);

  }

}
