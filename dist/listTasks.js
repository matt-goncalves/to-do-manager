"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTasks = listTasks;
function listTasks(db) {
    const tasks = db.map(task => {
        let checkbox = "[ ]";
        if (task.getStatus() === "complete") {
            checkbox = "[✓]";
        }
        return `${task.getTaskId()}. ${checkbox} ${task.getTitle()}`;
    });
    return tasks;
}
