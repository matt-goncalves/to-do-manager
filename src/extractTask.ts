import { Task , TaskObject } from "./Task";

export function extractTask( task : Task ) : TaskObject {
  return {
    title : task.getTitle() ,
    taskId : task.getTaskId() ,
    description : task.getDescription() ,
    status : task.getStatus() ,
    creationDate : task.getCreationDate()
  };
}


