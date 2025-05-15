"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandSave = commandSave;
const saveDatabase_1 = require("../../db/saveDatabase");
function commandSave(props) {
    if (props.commands.length > 1) {
        throw new Error("Save command does not have arguments.");
    }
    (0, saveDatabase_1.saveDatabase)(props.db);
}
