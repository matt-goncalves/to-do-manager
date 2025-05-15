"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTask = readTask;
const searchById_1 = require("./searchById");
function readTask(taskId, db) {
    const task = (0, searchById_1.searchById)(taskId, db);
    if (task) {
        return (`
--------------------------------------------------------------------------------
Title: ${task.getTitle()}
Description: ${task.getDescription()}
Creation date: ${task.getCreationDate()}
Status: ${task.getStatus()}
--------------------------------------------------------------------------------
`);
    }
    else {
        throw new Error(`Task ${taskId} does not exist.`);
    }
}
