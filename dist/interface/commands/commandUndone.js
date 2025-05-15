"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandUndone = commandUndone;
const idExists_1 = require("../../queries/idExists");
function commandUndone(props) {
    if (props.commands.length !== 2) {
        throw new Error(`Command was poorly formatted. Must be: reopen <task_id>.`);
    }
    const taskId = props.commands[1];
    if ((0, idExists_1.idExists)(taskId, props.db)) {
        const index = props.db.findIndex((task) => {
            if (task.getTaskId() === taskId) {
                return true;
            }
            else {
                return false;
            }
        });
        props.db[index].reopen();
    }
    else {
        throw new Error(`Error: task ${taskId} does not exist.`);
    }
}
