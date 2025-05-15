import { Task } from "../../model/Task";
import { idExists } from "../../queries/idExists";

export function commandUndone( props : CommandUndoneProps ) : void {

  if ( props.commands.length !== 2 ) {
    throw new Error(`Command was poorly formatted. Must be: reopen <task_id>.`);
  }

  const taskId = props.commands[1];

  if ( idExists( taskId , props.db ) ) {

    const index = props.db.findIndex( ( task ) => {

      if ( task.getTaskId() === taskId ) {
        return true;
      } else {
        return false;
      }
    });

    props.db[index].reopen();
    
  } else {
    throw new Error(`Error: task ${taskId} does not exist.`);
  }

}

type CommandUndoneProps = {
  db: Array<Task>,
  commands: Array<string>
};
