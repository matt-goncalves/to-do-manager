import readline from "node:readline";
import { hydrateTask } from "./operations/hydrateTask";
import { idExists } from "./queries/idExists";
import { loadDatabase } from "./db/loadDatabase";
import { Task } from "./model/Task";
import { parseCommand } from "./utils/parseCommand";
import { TXT_OPENING } from "./interface/texts";
import { TXT_DATABASE_LOADED } from "./interface/texts";
import { TXT_HELP } from "./interface/texts";
import { commandNew } from "./interface/commands/commandNew";
import { commandRead } from "./interface/commands/commandRead";
import { commandDelete } from "./interface/commands/commandDelete";
import { commandPurge } from "./interface/commands/commandPurge";
import { commandChange } from "./interface/commands/commandChange";
import { commandList } from "./interface/commands/commandList";
import { commandSave } from "./interface/commands/commandSave";
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
        try {
          const list = commandList({
            commands: commands,
            db: db
          });
          console.log("");
          list.forEach(item => console.log(item));
          console.log("");
        } catch ( err ) {
          if ( err instanceof Error ) {
            console.log("\n" + err.message + "\n");
          } else {
            console.log(err);
          }
        }
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
          if ( err instanceof Error ) {
            console.log("\n" + err.message + "\n");
          } else {
            console.log( err );
          }
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
          commandPurge({
            db : db,
            commands: commands
          });
          console.log("\n" + "All tasks have been deleted." + "\n");
        } catch ( err ) {
          if ( err instanceof Error ) {
            console.log( "\n" + err.message + "\n");
          } else {
            console.log(err);
          }

        }
        rl.prompt();
        break;
      }

      case "change":
      case "rename":
      case "update": {
        try {
          commandChange({
            commands: commands ,
            db : db
          });
          console.log("\n" + "Task updated." + "\n");
        } catch ( err ) {
          if ( err instanceof Error ) {
            console.log("\n" + err.message + "\n");
          } else {
            console.log(err);
          }
        }
        rl.prompt()
        break;
      }

      case "save": {
        try {
          commandSave({
            db: db ,
            commands: commands
          });
          console.log("\n" + "Database saved." + "\n");
        } catch (err) {
          if ( err instanceof Error ) {
            console.log("\n" + err.message + "\n");
          } else {
            console.log(err);
          }
        }
        rl.prompt();
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
