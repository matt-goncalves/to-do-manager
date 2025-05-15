"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = deleteTask;
const idExists_1 = require("../queries/idExists");
function deleteTask(taskId, db) {
    if ((0, idExists_1.idExists)(taskId, db)) {
        const index = db.findIndex(task => {
            if (task.getTaskId() === taskId) {
                return true;
            }
            else {
                return false;
            }
        });
        db.splice(index, 1);
    }
    else {
        throw new Error(`Task ID ${taskId} does not exist.`);
    }
}
