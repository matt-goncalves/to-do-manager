"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTasks = deleteAllTasks;
const deleteTask_1 = require("./deleteTask");
function deleteAllTasks(db) {
    const ids = [];
    db.forEach(task => {
        ids.push(task.getTaskId());
    });
    ids.forEach(id => {
        (0, deleteTask_1.deleteTask)(id, db);
    });
}
