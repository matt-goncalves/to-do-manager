import { Task } from "./Task";
import { searchById } from "./searchById";

export function idExists( id : string , db : Array<Task>) : boolean {
  if ( searchById( id , db ) ) {
    return true;
  } else {
    return false;
  }
}
