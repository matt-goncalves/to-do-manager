import { Task } from "../../model/Task";
import { deleteAllTasks } from "../../operations/deleteAllTasks";

export function commandPurge( props : CommandPurgeProps ) {

  if ( props.commands.length !== 1 ) {
    throw new Error("Command 'purge' does not receive any parameters. Ignoring.");
  }

  deleteAllTasks( props.db );

}

type CommandPurgeProps = {
  db: Array<Task> ,
  commands: Array<string>
};
