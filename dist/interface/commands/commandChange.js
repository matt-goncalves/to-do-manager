"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandChange = commandChange;
const searchById_1 = require("../../queries/searchById");
const removeQuotes_1 = require("../../utils/removeQuotes");
const updateTask_1 = require("../../operations/updateTask");
function commandChange(props) {
    if (props.commands.length === 1) {
        throw new Error("No parameters were given.");
    }
    if (props.commands.length === 2) {
        throw new Error("Must give attributes for change.\nExample: title=\"<new title>\"");
    }
    const id = props.commands[1];
    if (!id) {
        throw new Error("Must give a task ID to edit.");
    }
    // remove name of the command
    const params = props.commands.slice(1);
    // get task object to edit
    const taskToEdit = (0, searchById_1.searchById)(id, props.db);
    if (!taskToEdit) {
        throw new Error("Error: task was not found.");
    }
    // get list of requested changes
    const changes = params.splice(1);
    // check validity of given parameters ( must be key="value" )
    const paramCheck = /^(\w+)="([^"]+)"$/;
    // process given parameters
    changes.forEach(change => {
        if (!paramCheck.test(change)) {
            throw new Error(`Parameter ${change} was poorly formatted. Ignoring.`);
        }
        const [key, value] = change.split("=");
        switch (key) {
            case "title": {
                taskToEdit.setTitle((0, removeQuotes_1.removeQuotes)(value));
                break;
            }
            case "description": {
                taskToEdit.setDescription((0, removeQuotes_1.removeQuotes)(value));
                break;
            }
            default: {
                throw new Error(`Unknown command ${key}. Ignoring.`);
            }
        }
        // perform update
        (0, updateTask_1.updateTask)(taskToEdit, props.db);
    });
}
