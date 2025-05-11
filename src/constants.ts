import path from "node:path";

export const DB_LOCATION = path.join( __dirname , "../data/tasks.json" );
export const BKP_LOCATION = path.join( __dirname , "../data/.tasks_bkp.json" );
