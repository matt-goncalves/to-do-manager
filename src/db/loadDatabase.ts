import { TaskObject } from "../model/Task";
import { DB_LOCATION } from  "../constants";
import fs from "node:fs";

export function loadDatabase() : Array<TaskObject> {
  if ( ! fs.existsSync( DB_LOCATION ) ) {
    throw new Error( "Error: database file not found." );
  }
  const file = fs.readFileSync( DB_LOCATION , "utf-8" );
  return JSON.parse( file );
}


