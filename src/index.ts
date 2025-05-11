import path from "node:path";
import fs from "node:fs";
import readline from "node:readline";

const DB_LOCATION = path.join( __dirname , "../data/tasks.json" );
const BKP_LOCATION = path.join( __dirname , "../data/.tasks_bkp.json" );

class Task {
  #title : string;
  #taskId : string;
  #description: string;
  #creationDate: string;
  #status: "open" | "complete";

  constructor(
    taskObject : TaskObject
  ) {
    this.#title = taskObject.title;
    this.#taskId = taskObject.taskId;
    this.#description = taskObject.description;
    this.#creationDate = taskObject.creationDate;
    this.#status = taskObject.status;
  }

  complete() {
    this.#status = "complete";
  }

  reopen() {
    this.#status = "open";
  }

  getTitle() {
    return this.#title;
  }

  getDescription() {
    return this.#description;
  }

  getCreationDate() {
    return this.#creationDate;
  }

  getStatus() {
    return this.#status;
  }

  getTaskId() {
    return this.#taskId;
  }

  setTitle( newTitle : string ) {
    this.#title = newTitle;
  }

  setDescription( newDescription : string ) {
    this.#description = newDescription;
  }
}

function createTask(
  title : string ,
  description : string ,
  db : Array<Task>
) : void {
  const task = new Task(
    {
      title: title,
      taskId: generateId( db ),
      description: description,
      creationDate: now(),
      status: "open"
    }
  );
  db.push( task );
}

function deleteTask( taskId : string , db : Array<Task>) : void {

  if ( idExists( taskId , db ) )  {

    const index = db.findIndex( task => {

      if ( task.getTaskId() === taskId ) {
        return true;
      } else {
        return false;
      }
    });

    db.splice(index , 1);

  } else {
    throw new Error( `Error: task ID ${taskId} does not exist.` );
  }
}

function readTask( taskId : string , db : Array<Task>) : string {
  const task = searchById( taskId , db );
  if ( task ) {
    return (
`
--------------------------------------------------------------------------------
Title: ${task.getTitle()}
Description: ${task.getDescription()}
Creation date: ${task.getCreationDate()}
Status: ${task.getStatus()}
--------------------------------------------------------------------------------
`
    );
  } else {
    throw new Error(`Task ${taskId} does not exist.`);
  }
}

function updateTask( newTask : Task , db : Array<Task>) : void {

  const taskId = newTask.getTaskId();

  if ( idExists( taskId , db ) ) {

    const index = db.findIndex( ( task ) => {
      
      if ( task.getTaskId() === taskId ) {
        return true;
      } else {
        return false;
      }

    });

    db[index] = newTask;

  } else {

    throw new Error(`Task ${taskId} does not exist.`);

  }
}

function listTasks( db : Array<Task> ) : Array<string> {
  const tasks = db.map( task => {
    let checkbox = "[ ]";
    if ( task.getStatus() === "complete" ) {
      checkbox = "[✓]";
    }
    return `${task.getTaskId()}. ${checkbox} ${task.getTitle()}`;
  });
  return tasks;
}

function searchByTitle( title : string , db : Array<Task>) : Array<Task> | undefined {
  const entries = db.filter( task => {
    if ( task.getTitle() === title ) {
      return task;
    }
  });
  return entries;
}

function searchById( id : string , db : Array<Task>) : Task | undefined {
  return db.find( task => {
    if ( task.getTaskId() === id ) {
      return task;
    }
  });
}

function idExists( id : string , db : Array<Task>) : boolean {
  if ( searchById( id , db ) ) {
    return true;
  } else {
    return false;
  }
}

function loadDatabase() : Array<TaskObject> {
  if ( ! fs.existsSync( DB_LOCATION ) ) {
    throw new Error( "Error: database file not found." );
  }
  const file = fs.readFileSync( DB_LOCATION , "utf-8" );
  return JSON.parse( file );
}

function saveDatabase( db : Array<Task> ) {
  const tasks = db.map( task => {
    return extractTask( task );
  });
  const data = JSON.stringify( tasks );
  try {
    // Copy backup first for non-destructive process
    fs.copyFileSync( DB_LOCATION , BKP_LOCATION );
    fs.writeFileSync( DB_LOCATION , data , "utf-8" );
  } catch ( err ) {
    console.error( err );
  }
}

function createDatabase() : void {
  const data = "[]";
  try {
    fs.writeFileSync( DB_LOCATION , data , "utf-8" );
  } catch ( err ) {
    console.error( err );
  }
}

function extractTask( task : Task ) : TaskObject {
  return {
    title : task.getTitle() ,
    taskId : task.getTaskId() ,
    description : task.getDescription() ,
    status : task.getStatus() ,
    creationDate : task.getCreationDate()
  };
}

function hydrateTask( taskObject : TaskObject ) {
  const task = new Task(
    {
      title: taskObject.title,
      taskId:  taskObject.taskId,
      description:  taskObject.description,
      creationDate:  taskObject.creationDate,
      status: taskObject.status
    }
  );
  return task;
}

function generateId( db : Array<Task>) : string {

  let counter = db.length;

  while ( idExists( String(counter) , db ) ) {
    counter++
  }

  return String(counter);

}

function now() {
  return new Date().toISOString();
}

type TaskObject = {
  title : string ,
  taskId : string ,
  description : string ,
  creationDate : string ,
  status : "open" | "complete"
};

function parseCommand(input: string): string[] {

  const regex = /[^\s"]+="[^"]*"|[^\s"]+/g
  const result : Array<string> = [];

  let match;

  while ( ( match = regex.exec( input ) ) !== null ) {

    if ( match[1] !== undefined ) {

      result.push( match[1] );

    } else {

      result.push(match[0]);

    }
  }

  return result;
}

function removeQuotes(str: string): string {
  return str.replace(/^['"]|['"]$/g, '');
}

function main() {
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

main();
