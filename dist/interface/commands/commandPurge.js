"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandPurge = commandPurge;
const deleteAllTasks_1 = require("../../operations/deleteAllTasks");
function commandPurge(props) {
    if (props.commands.length !== 1) {
        throw new Error("Command 'purge' does not receive any parameters. Ignoring.");
    }
    (0, deleteAllTasks_1.deleteAllTasks)(props.db);
}
