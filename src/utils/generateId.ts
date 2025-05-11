import { Task } from "../model/Task";
import { idExists } from "../queries/idExists";

export function generateId( db : Array<Task>) : string {

  let counter = db.length;

  while ( idExists( String(counter) , db ) ) {
    counter++
  }

  return String(counter);

}


