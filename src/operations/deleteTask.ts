import { Task } from "../model/Task";
import { idExists } from "../queries/idExists";

export function deleteTask( taskId : string , db : Array<Task>) : void {

  if ( idExists( taskId , db ) )  {

    const index = db.findIndex( task => {

      if ( task.getTaskId() === taskId ) {
        return true;
      } else {
        return false;
      }
    });

    db.splice(index , 1);

  } else {
    throw new Error( `Task ID ${taskId} does not exist.` );
  }
}

