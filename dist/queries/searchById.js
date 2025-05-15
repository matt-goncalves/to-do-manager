"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchById = searchById;
function searchById(id, db) {
    return db.find(task => {
        if (task.getTaskId() === id) {
            return task;
        }
    });
}
