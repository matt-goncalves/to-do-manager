import { Task } from "../../model/Task";
import { idExists } from "../../queries/idExists";

export function commandDone( props : CommandDoneProps ) {

  if ( props.commands.length !== 2 ) {
    throw new Error(`Command was poorly formatted. Must be: done <task_id>.`);
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

    props.db[index].complete();
    
  } else {
    throw new Error(`Error: task ${taskId} does not exist.`);
  }

}

type CommandDoneProps = {
  db: Array<Task>,
  commands: Array<string>
}
