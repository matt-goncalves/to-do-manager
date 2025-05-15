"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    #title;
    #taskId;
    #description;
    #creationDate;
    #status;
    constructor(taskObject) {
        this.#title = taskObject.title;
        this.#taskId = taskObject.taskId;
        this.#description = taskObject.description;
        this.#creationDate = taskObject.creationDate;
        this.#status = taskObject.status;
    }
    complete() {
        this.#status = "complete";
    }
    reopen() {
        this.#status = "open";
    }
    getTitle() {
        return this.#title;
    }
    getDescription() {
        return this.#description;
    }
    getCreationDate() {
        return this.#creationDate;
    }
    getStatus() {
        return this.#status;
    }
    getTaskId() {
        return this.#taskId;
    }
    setTitle(newTitle) {
        this.#title = newTitle;
    }
    setDescription(newDescription) {
        this.#description = newDescription;
    }
}
exports.Task = Task;
