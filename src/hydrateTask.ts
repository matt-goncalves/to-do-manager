import { Task , TaskObject } from "./Task";

export function hydrateTask( taskObject : TaskObject ) {
  const task = new Task(
    {
      title: taskObject.title,
      taskId:  taskObject.taskId,
      description:  taskObject.description,
      creationDate:  taskObject.creationDate,
      status: taskObject.status
    }
  );
  return task;
}


