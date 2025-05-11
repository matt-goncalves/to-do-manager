import readline from "node:readline";
import { deleteAllTasks } from "./operations/deleteAllTasks";
import { hydrateTask } from "./operations/hydrateTask";
import { idExists } from "./queries/idExists";
import { listTasks } from "./operations/listTasks";
import { loadDatabase } from "./db/loadDatabase";
import { saveDatabase } from "./db/saveDatabase";
import { searchById } from "./queries/searchById";
import { Task } from "./model/Task";
import { updateTask } from "./operations/updateTask";
import { parseCommand } from "./utils/parseCommand";
import { removeQuotes } from "./utils/removeQuotes";
import { TXT_OPENING } from "./interface/texts";
import { TXT_DATABASE_LOADED } from "./interface/texts";
import { TXT_HELP } from "./interface/texts";
import { commandNew } from "./interface/commands/commandNew";
import { commandRead } from "./interface/commands/commandRead";
import { commandDelete } from "./interface/commands/commandDelete";
import { friendlyDate } from "./utils/friendlyDate";

export function main() {

  const rl = readline.createInterface({
    input: process.stdin ,
    output: process.stdout ,
    prompt: "[ Tasks ] >>> "
  });

  // welcomes the  user
  console.log(TXT_OPENING);

  let db : Array<Task>;

  try {

    const entries = loadDatabase();

    // rehydrate database
    db = entries.map(entry => {
      return hydrateTask({
        title: entry.title ,
        taskId: entry.taskId ,
        description: entry.description ,
        creationDate: entry.creationDate,
        status: entry.status
      });
    });

    console.log(TXT_DATABASE_LOADED);
    rl.prompt();

  } catch (err) {

    console.log(err);
    rl.prompt();

  }

  // command line
  rl.on( "line" , ( line ) => {

    const commands = parseCommand( line );

    switch ( commands[0] ) {

      case "ls":
      case "list": {
        const tasks = listTasks( db );
        console.log("");
        tasks.forEach(task => {
          console.log( task );
        });
        console.log("");
        rl.prompt();
        break;
      }

      case "create":
      case "task":
      case "new": {
        try {
          commandNew({
            commands: commands,
            db: db,
          });
          console.log("\n" + "Entry created." + "\n");
          rl.prompt();
          break;
        } catch ( err ) {
          console.log("\n" + err + "\n");
        }
        rl.prompt();
        break;
      }

      case "read":
      case "details": {
        try {
          const fetchedTask = commandRead({
            commands: commands,
            db: db
          });
          console.log( "" );
          console.log( "------------------" )
          console.log( `TASK #${fetchedTask.taskId}` );
          console.log( "Title:" , fetchedTask.title );
          console.log( "Description:" , fetchedTask.description );
          console.log( "Creation date:" , friendlyDate( new Date( fetchedTask.creationDate ) ));
          console.log( "Status:" , fetchedTask.status );
          console.log( "------------------" )
          console.log( "" );
        } catch ( err ) {
          console.log("\n" + err + "\n");
        }
        rl.prompt();
        break;
      }

      case "del":
      case "delete": {
        try {
          commandDelete({
            commands: commands ,
            db: db
          });
          console.log("\n" + "Entry deleted." + "\n");
        } catch (err) {
          if ( err instanceof Error ) {
            console.log("\n" + err.message + "\n");
          } else {
            console.log( err );
          }
        }
        rl.prompt();
        break;
      }

      case "purge": {
        try {
          db = deleteAllTasks();
          console.log("\n" + "All tasks have been deleted." + "\n");
          rl.prompt();
        } catch ( err ) {
          console.log( "\n" + err + "\n");
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
          console.log( "\n" + "Error: no task was given to edit." + "\n" );
          rl.prompt();
          break;
        }

        const taskToEdit : Task | undefined = searchById( taskToEditId , db );

        if ( ! taskToEdit ) {
          console.log("\n" + "Error: task was not found." + "\n");
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
              console.log("\n" + "Task has been updated." + "\n");
              rl.prompt();

            } catch (err) {

              console.log("\n" + err + "\n");
              rl.prompt();

            }
          } else {

            console.log("\n" + `Unrecognized command: ${change}. Nothing was done.` + "\n");
            rl.prompt();

          }
          
        });

        break;
      }

      case "save": {
        try {
          saveDatabase( db );
          console.log("\n" + "Database saved." + "\n");
          rl.prompt();
        } catch (err) {
          console.log("\n" + err + "\n");
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
        console.log("\n" + "Exiting..." + "\n");
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
          console.log("\n" + "Task completed." + "\n");
          rl.prompt();
          
        } else {
          console.log("\n" + `Error: task ${taskId} does not exist.` + "\n");
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
          console.log("\n" + "Task reopened." + "\n");
          rl.prompt();
          
        } else {
          console.log("\n" + `Error: task ${taskId} does not exist.` + "\n");
          rl.prompt();
        }
        break;
      }
      case "help":
       case "h": {
        console.log(TXT_HELP);
        rl.prompt();
        break;
      }
      default: {
        console.log("\n" + "Unrecognized command." + "\n");
        rl.prompt();
      }
    }
  });

  rl.on( "close" , () => {
    console.log("\n" + "Exiting..." + "\n");
    process.exit(0);
  });

}
