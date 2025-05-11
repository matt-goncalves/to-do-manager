import { readTask } from "../../operations/readTask";
import { Task } from "../../model/Task";

export function commandRead( props : CommandReadProps ) {

  const id = props.commands[1];

  if ( ! id ) {
    throw new Error("No parameter was given.");
  }

  if ( props.commands.length > 2 ) {
    throw new Error("Too many parameters were given.");
  }

  return readTask( id , props.db );

}

export type CommandReadProps = {
  commands: Array<string>,
  db: Array<Task> 
}
