import { DB_LOCATION } from "../constants";
import fs from "node:fs";

export function createDatabase() : void {
  const data = "[]";
  try {
    fs.writeFileSync( DB_LOCATION , data , "utf-8" );
  } catch ( err ) {
    console.error( err );
  }
}


