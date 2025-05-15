import { deleteTask } from "./deleteTask";
import { Task } from "../model/Task";

export function deleteAllTasks( db : Array<Task> ) : void {

  const ids : Array<string> = [];

  db.forEach( task => {

    ids.push(task.getTaskId());
    
  });

  ids.forEach( id =>  {

    deleteTask( id , db )

  });

}
