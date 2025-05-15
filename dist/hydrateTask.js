"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hydrateTask = hydrateTask;
const Task_1 = require("./Task");
function hydrateTask(taskObject) {
    const task = new Task_1.Task({
        title: taskObject.title,
        taskId: taskObject.taskId,
        description: taskObject.description,
        creationDate: taskObject.creationDate,
        status: taskObject.status
    });
    return task;
}
