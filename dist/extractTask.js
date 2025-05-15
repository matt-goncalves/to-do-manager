"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTask = extractTask;
function extractTask(task) {
    return {
        title: task.getTitle(),
        taskId: task.getTaskId(),
        description: task.getDescription(),
        status: task.getStatus(),
        creationDate: task.getCreationDate()
    };
}
