import { Task } from "../model/Task";
import { searchById } from "../queries/searchById";

export function idExists( id : string , db : Array<Task>) : boolean {
  if ( searchById( id , db ) ) {
    return true;
  } else {
    return false;
  }
}
