import { removeQuotes } from "../../utils/removeQuotes";
import { createTask } from "../../operations/createTask";
import { Task } from "../../model/Task";

export function commandNew( props : CommandNewProps ) {

  const params = props.commands.slice( 1 );

  if ( params.length === 0 ) {
    throw new Error("No parameters were given.");
  }

  let title = "Untitled Task";
  let description = "";

  const paramCheck = /^(\w+)="([^"]+)"$/;

  params.forEach( param => {

    if ( ! paramCheck.test( param ) ) {
      throw new Error(`Parameter ${param} was poorly formatted. Ignoring.`);
    }

    // split key and value params
    const [ key , value ] = param.split("=");

    switch ( key ) {
      case "title": {
        title = removeQuotes(value);
        break;
      }
      case "description": {
        description = removeQuotes(value);
        break;
      }
      default: {
        throw new Error(`Unrecognized command: ${param}` );
      }
    }

    createTask( title , description , props.db );

  });
}

type CommandNewProps = {
  commands : Array<string>,
  db : Array<Task>
}
