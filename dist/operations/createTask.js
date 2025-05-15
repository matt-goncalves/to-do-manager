"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
const Task_1 = require("../model/Task");
const generateId_1 = require("../utils/generateId");
const now_1 = require("../utils/now");
function createTask(title, description, db) {
    const task = new Task_1.Task({
        title: title,
        taskId: (0, generateId_1.generateId)(db),
        description: description,
        creationDate: (0, now_1.now)(),
        status: "open"
    });
    db.push(task);
}
