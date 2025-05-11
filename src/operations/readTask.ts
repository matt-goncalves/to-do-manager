import { searchById } from "../queries/searchById";
import { Task , TaskObject } from "../model/Task";

export function readTask( taskId : string , db : Array<Task>) : TaskObject {

  const task = searchById( taskId , db );

  if ( task ) {

    return ({
      title: task.getTitle(),
      description: task.getDescription(),
      taskId: task.getTaskId(),
      creationDate: task.getCreationDate(),
      status: task.getStatus()
    });

  } else {

    throw new Error(`Task ${taskId} does not exist.`);

  }

}
