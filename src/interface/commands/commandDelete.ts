import { Task } from "../../model/Task";
import { deleteTask } from "../../operations/deleteTask";

export function commandDelete( props : CommandDeleteProps ) : void {

  if ( props.commands.length > 2 ) {
    throw new Error("Too many parameters were given.");
  }

  const id = props.commands[1];

  if ( ! id ) {
    throw new Error("Not enough parameters.");
  }

  deleteTask( id , props.db );

}

export type CommandDeleteProps = {
  commands : Array<string> ,
  db : Array<Task>
};
