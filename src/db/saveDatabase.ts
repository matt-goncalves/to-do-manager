import { Task } from "../model/Task";
import { extractTask } from "../operations/extractTask";
import { DB_LOCATION , BKP_LOCATION } from "../constants";
import fs from "node:fs";

export function saveDatabase( db : Array<Task> ) {
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
