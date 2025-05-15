"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandList = commandList;
const listTasks_1 = require("../../operations/listTasks");
function commandList(props) {
    if (props.commands.length > 1) {
        throw new Error("Command \"list\" does not receive arguments.");
    }
    const tasks = (0, listTasks_1.listTasks)(props.db);
    if (tasks.length === 0) {
        throw new Error("There are no entries.");
    }
    const writtenList = tasks.map(task => {
        let checkbox = "[ ]";
        if (task.getStatus() === "complete") {
            checkbox = "[✓]";
        }
        return `${checkbox} ${task.getTaskId()}. ${task.getTitle()}`;
    });
    return writtenList;
}
