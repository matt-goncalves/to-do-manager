import { Task } from "./Task";
import { idExists } from "./idExists";

export function updateTask( newTask : Task , db : Array<Task>) : void {

  const taskId = newTask.getTaskId();

  if ( idExists( taskId , db ) ) {

    const index = db.findIndex( ( task ) => {
      
      if ( task.getTaskId() === taskId ) {
        return true;
      } else {
        return false;
      }

    });

    db[index] = newTask;

  } else {

    throw new Error(`Task ${taskId} does not exist.`);

  }
}
