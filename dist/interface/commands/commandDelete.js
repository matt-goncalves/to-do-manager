"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandDelete = commandDelete;
const deleteTask_1 = require("../../operations/deleteTask");
function commandDelete(props) {
    if (props.commands.length > 2) {
        throw new Error("Too many parameters were given.");
    }
    const id = props.commands[1];
    if (!id) {
        throw new Error("Not enough parameters.");
    }
    (0, deleteTask_1.deleteTask)(id, props.db);
}
