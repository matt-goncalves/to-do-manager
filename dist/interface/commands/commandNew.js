"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandNew = commandNew;
const removeQuotes_1 = require("../../utils/removeQuotes");
const createTask_1 = require("../../operations/createTask");
function commandNew(props) {
    const params = props.commands.slice(1);
    if (params.length === 0) {
        throw new Error("No parameters were given.");
    }
    let title = undefined;
    let description = undefined;
    const paramCheck = /^(\w+)="([^"]+)"$/;
    params.forEach(param => {
        if (!paramCheck.test(param)) {
            throw new Error(`Parameter ${param} was poorly formatted. Ignoring.`);
        }
        // split key and value params
        const [key, value] = param.split("=");
        switch (key) {
            case "title": {
                if (title) {
                    throw new Error("Title has been given twice in the same command. Aborting.");
                }
                title = (0, removeQuotes_1.removeQuotes)(value);
                break;
            }
            case "description": {
                if (description) {
                    throw new Error("Description has been given twice in the same command. Aborting");
                }
                description = (0, removeQuotes_1.removeQuotes)(value);
                break;
            }
            default: {
                throw new Error(`Unrecognized command: ${param}`);
            }
        }
    });
    if (!title) {
        throw new Error("Title was not defined. Aborting.");
    }
    (0, createTask_1.createTask)(title, description ? description : '', props.db);
}
