import readline from "node:readline";
import { createTask } from "./operations/createTask";
import { deleteAllTasks } from "./operations/deleteAllTasks";
import { deleteTask } from "./operations/deleteTask";
import { hydrateTask } from "./operations/hydrateTask";
import { idExists } from "./queries/idExists";
import { listTasks } from "./operations/listTasks";
import { loadDatabase } from "./db/loadDatabase";
import { readTask } from "./operations/readTask";
import { saveDatabase } from "./db/saveDatabase";
import { searchById } from "./queries/searchById";
import { Task } from "./model/Task";
import { updateTask } from "./operations/updateTask";
import { parseCommand } from "./utils/parseCommand";
import { removeQuotes } from "./utils/removeQuotes";

export function main() {
  const rl = readline.createInterface({
    input: process.stdin ,
    output: process.stdout ,
    prompt: "[ Tasks ] >>> "
  });

  let db : Array<Task>;

  try {
    console.log(
`
-------------------------
TO DO LIST       ver. 1.0
-------------------------

Welcome to the task list manager.
Loading database...
` 
    )

    const entries = loadDatabase();

    db = entries.map(entry => {
      return hydrateTask({
        title: entry.title ,
        taskId: entry.taskId ,
        description: entry.description ,
        creationDate: entry.creationDate,
        status: entry.status
      });
    });

    console.log(
`
Database loaded.
Ready for input.
`
    )

    rl.prompt();

  } catch (err) {

    console.log(err);
    rl.prompt();

  }

  rl.on( "line" , ( line ) => {

    const commands = parseCommand( line );

    switch ( commands[0] ) {

      case "ls":
      case "list": {
        const tasks = listTasks( db );
        console.log("");
        tasks.forEach(task => {
          console.log( task )
        });
        console.log("");
        rl.prompt();
        break;
      }

      case "new": {

        let title = "Untitled Task";
        let description = "";

        const params = commands.slice( 1 );

        params.forEach( param => {

          if ( param.includes("=") ) {

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
                console.log( "Error: unrecognized command:" , param );
                break;
              }
            }

            createTask( title , description , db );

            console.log("");
            console.log("Task created.");
            console.log("");

            rl.prompt();

          } else {

            console.log(`Parameter ${param} is unknown. It was ignored.`);

          }

        });
        break;
      }

      case "read":
      case "details": {
        const id = commands[1];
        console.log(readTask( id , db ));
        rl.prompt();
        break;
      }

      case "del":
      case "delete": {
        const id = commands[1];
        try {
          deleteTask( id , db );
          console.log("");
          console.log("Entry deleted.");
          console.log("");
          rl.prompt();
        } catch (err) {
          console.log(err);
          rl.prompt();
        }
        break;
      }

      case "purge": {
        try {
          db = deleteAllTasks();
          console.log("");
          console.log("All tasks have been deleted.");
          console.log("");
          rl.prompt();
        } catch ( err ) {
          console.log("");
          console.log( err );
          console.log("");
          rl.prompt();
        }
        break;
      }

      case "change":
      case "rename":
      case "update": {

        const params = commands.slice(1);

        const taskToEditId = params[0];

        if (! taskToEditId ) {
          console.log( "Error: no task was given to edit." );
          rl.prompt();
          break;
        }

        const taskToEdit : Task | undefined = searchById( taskToEditId , db );

        if ( ! taskToEdit ) {
          console.log("Error: task was not found.");
          rl.prompt();
          break;
        }

        const changes = params.splice(1);

        changes.forEach( change => {

          if ( change.includes("=") ) {

            const [ key , value ] = change.split("=");

            switch ( key ) {
              case "title": {
                taskToEdit.setTitle(removeQuotes(value));
                break;
              }
              case "description": {
                taskToEdit.setDescription(removeQuotes(value));
                break;
              }
            }

            try {

              updateTask( taskToEdit , db );
              console.log("Task has been updated.");
              rl.prompt();

            } catch (err) {

              console.log(err);
              rl.prompt();

            }
          } else {

            console.log(`Unrecognized command: ${change}. Nothing was done.`);
            rl.prompt();

          }
          
        });

        break;
      }

      case "save": {
        try {
          saveDatabase( db );
          console.log("");
          console.log("Database saved.");
          console.log("");
          rl.prompt();
        } catch (err) {
          console.log(err);
          rl.prompt();
        }
        break;
      }

      case "c":
      case "clean":
      case "clear": {
        console.clear();
        rl.prompt();
        break;
      }

      case "exit":
      case "quit": {
        console.log("Exiting...");
        process.exit(0);
      }

      case "done":
      case "finish":
      case "complete":
      case "finished":
      case "check":
      case "conclude": {
        const taskId = commands[1];
        if ( idExists( taskId , db ) ) {

          const index = db.findIndex( ( task ) => {

            if ( task.getTaskId() === taskId ) {
              return true;
            } else {
              return false;
            }
          });

          db[index].complete();
          console.log("");
          console.log("Task completed.");
          console.log("");
          rl.prompt();
          
        } else {
          console.log(`Error: task ${taskId} does not exist.`);
          rl.prompt();
        }
        break;
      }
      case "open":
      case "reopen":
      case "activate":
      case "reactivate":
      case "uncheck": {
        const taskId = commands[1];
        if ( idExists( taskId , db ) ) {

          const index = db.findIndex( ( task ) => {

            if ( task.getTaskId() === taskId ) {
              return true;
            } else {
              return false;
            }
          });

          db[index].reopen();
          console.log("Task reopened.");
          rl.prompt();
          
        } else {
          console.log(`Error: task ${taskId} does not exist.`);
          rl.prompt();
        }
        break;
      }
      default: {
        console.log("Unrecognized command.");
        rl.prompt();
      }
    }
  });

  rl.on( "close" , () => {
    console.log("Exiting...");
    process.exit(0);
  });

}
