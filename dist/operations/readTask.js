"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTask = readTask;
const searchById_1 = require("../queries/searchById");
function readTask(taskId, db) {
    const task = (0, searchById_1.searchById)(taskId, db);
    if (task) {
        return ({
            title: task.getTitle(),
            description: task.getDescription(),
            taskId: task.getTaskId(),
            creationDate: task.getCreationDate(),
            status: task.getStatus()
        });
    }
    else {
        throw new Error(`Task ${taskId} does not exist.`);
    }
}
