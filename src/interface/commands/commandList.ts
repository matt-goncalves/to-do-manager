import { Task } from "../../model/Task";
import { listTasks } from "../../operations/listTasks";

export function commandList( props : CommandListProps ) : Array<string> {

  if ( props.commands.length > 1 ) {
    throw new Error("Command \"list\" does not receive arguments.");
  }

  const tasks = listTasks( props.db );

  if ( tasks.length === 0 ) {
    throw new Error("There are no entries.");
  }

  const writtenList = tasks.map( task => {

    let checkbox = "[ ]";

    if ( task.getStatus() === "complete" ) {
      checkbox = "[✓]";
    }

    return `${checkbox} ${task.getTaskId()}. ${task.getTitle()}`;

  });

  return writtenList;

}

type CommandListProps = {
  commands: Array<string>,
  db: Array<Task>
}
