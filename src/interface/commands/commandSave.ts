import { Task } from "../../model/Task";
import { saveDatabase } from "../../db/saveDatabase";

export function commandSave( props : CommandSaveProps ) : void {

  if ( props.commands.length > 1 )  {
    throw new Error("Save command does not have arguments.");
  }

  saveDatabase( props.db );
  
}

type CommandSaveProps = {
  db : Array<Task>,
  commands : Array<string>
}
