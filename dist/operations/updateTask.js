"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = updateTask;
const idExists_1 = require("../queries/idExists");
function updateTask(newTask, db) {
    const taskId = newTask.getTaskId();
    if ((0, idExists_1.idExists)(taskId, db)) {
        const index = db.findIndex((task) => {
            if (task.getTaskId() === taskId) {
                return true;
            }
            else {
                return false;
            }
        });
        db[index] = newTask;
    }
    else {
        throw new Error(`Task ${taskId} does not exist.`);
    }
}
