import { Task } from "../../model/Task";
import { searchById } from "../../queries/searchById";
import { removeQuotes } from "../../utils/removeQuotes";
import { updateTask } from "../../operations/updateTask";

export function commandChange( props : CommandChangeProps ) {

  if ( props.commands.length === 1 ) {
    throw new Error("No parameters were given.");
  }

  if ( props.commands.length === 2 ) {
    throw new Error("Must give attributes for change.\nExample: title=\"<new title>\"");
  }

  const id = props.commands[1];

  if ( ! id ) {
    throw new Error("Must give a task ID to edit.");
  }

  // remove name of the command
  const params = props.commands.slice(1);

  // get task object to edit
  const taskToEdit : Task | undefined = searchById( id , props.db );

  if ( ! taskToEdit ) {
    throw new Error("Error: task was not found.");
  }

  // get list of requested changes
  const changes = params.splice(1);

  // check validity of given parameters ( must be key="value" )
  const paramCheck = /^(\w+)="([^"]+)"$/;

  // process given parameters
  changes.forEach( change => {

    if ( ! paramCheck.test( change ) ) {
      throw new Error(`Parameter ${change} was poorly formatted. Ignoring.`);
    }

    const [ key , value ] = change.split("=");

    switch ( key ) {

      case "title": {
        taskToEdit.setTitle( removeQuotes(value) );
        break;
      }

      case "description": {
        taskToEdit.setDescription( removeQuotes(value) );
        break;
      }

      default: {
        throw new Error(`Unknown command ${key}. Ignoring.`);
      }

    }

    // perform update
    updateTask( taskToEdit , props.db );

  });

}

export type CommandChangeProps = {
  commands : Array<string>,
  db : Array<Task>
}
