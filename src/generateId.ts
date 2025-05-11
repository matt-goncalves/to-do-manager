import { Task } from "./Task";
import { idExists } from "./idExists";

export function generateId( db : Array<Task>) : string {

  let counter = db.length;

  while ( idExists( String(counter) , db ) ) {
    counter++
  }

  return String(counter);

}


