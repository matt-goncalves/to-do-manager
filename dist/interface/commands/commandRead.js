"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandRead = commandRead;
const readTask_1 = require("../../operations/readTask");
function commandRead(props) {
    const id = props.commands[1];
    if (!id) {
        throw new Error("No parameter was given.");
    }
    if (props.commands.length > 2) {
        throw new Error("Too many parameters were given.");
    }
    return (0, readTask_1.readTask)(id, props.db);
}
