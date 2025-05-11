import { Task } from "../../model/Task";
import { deleteAllTasks } from "../../operations/deleteAllTasks";

export function commandPurge( props : CommandPurgeProps ) {

  props.db = deleteAllTasks();

}

type CommandPurgeProps = {
  db: Array<Task> ,
};
