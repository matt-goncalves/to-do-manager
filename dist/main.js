"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const node_readline_1 = __importDefault(require("node:readline"));
const hydrateTask_1 = require("./operations/hydrateTask");
const loadDatabase_1 = require("./db/loadDatabase");
const parseCommand_1 = require("./utils/parseCommand");
const texts_1 = require("./interface/texts");
const texts_2 = require("./interface/texts");
const texts_3 = require("./interface/texts");
const commandNew_1 = require("./interface/commands/commandNew");
const commandRead_1 = require("./interface/commands/commandRead");
const commandDelete_1 = require("./interface/commands/commandDelete");
const commandPurge_1 = require("./interface/commands/commandPurge");
const commandChange_1 = require("./interface/commands/commandChange");
const commandList_1 = require("./interface/commands/commandList");
const commandSave_1 = require("./interface/commands/commandSave");
const commandDone_1 = require("./interface/commands/commandDone");
const commandUndone_1 = require("./interface/commands/commandUndone");
const friendlyDate_1 = require("./utils/friendlyDate");
function main() {
    const rl = node_readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "[ Tasks ] >>> "
    });
    // welcomes the  user
    console.log(texts_1.TXT_OPENING);
    let db;
    try {
        const entries = (0, loadDatabase_1.loadDatabase)();
        // rehydrate database
        db = entries.map(entry => {
            return (0, hydrateTask_1.hydrateTask)({
                title: entry.title,
                taskId: entry.taskId,
                description: entry.description,
                creationDate: entry.creationDate,
                status: entry.status
            });
        });
        console.log(texts_2.TXT_DATABASE_LOADED);
        rl.prompt();
    }
    catch (err) {
        console.log(err);
        rl.prompt();
    }
    // command line
    rl.on("line", (line) => {
        const commands = (0, parseCommand_1.parseCommand)(line);
        switch (commands[0]) {
            case "ls":
            case "list": {
                try {
                    const list = (0, commandList_1.commandList)({
                        commands: commands,
                        db: db
                    });
                    console.log("");
                    list.forEach(item => console.log(item));
                    console.log("");
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log("\n" + err.message + "\n");
                    }
                    else {
                        console.log(err);
                    }
                }
                rl.prompt();
                break;
            }
            case "create":
            case "task":
            case "new": {
                try {
                    (0, commandNew_1.commandNew)({
                        commands: commands,
                        db: db,
                    });
                    console.log("\n" + "Entry created." + "\n");
                    rl.prompt();
                    break;
                }
                catch (err) {
                    console.log("\n" + err + "\n");
                }
                rl.prompt();
                break;
            }
            case "read":
            case "view":
            case "details": {
                try {
                    const fetchedTask = (0, commandRead_1.commandRead)({
                        commands: commands,
                        db: db
                    });
                    console.log("");
                    console.log("------------------");
                    console.log(`TASK #${fetchedTask.taskId}`);
                    console.log("Title:", fetchedTask.title);
                    console.log("Description:", fetchedTask.description);
                    console.log("Creation date:", (0, friendlyDate_1.friendlyDate)(new Date(fetchedTask.creationDate)));
                    console.log("Status:", fetchedTask.status);
                    console.log("------------------");
                    console.log("");
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log("\n" + err.message + "\n");
                    }
                    else {
                        console.log(err);
                    }
                }
                rl.prompt();
                break;
            }
            case "del":
            case "delete": {
                try {
                    (0, commandDelete_1.commandDelete)({
                        commands: commands,
                        db: db
                    });
                    console.log("\n" + "Entry deleted." + "\n");
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log("\n" + err.message + "\n");
                    }
                    else {
                        console.log(err);
                    }
                }
                rl.prompt();
                break;
            }
            case "purge": {
                try {
                    (0, commandPurge_1.commandPurge)({
                        db: db,
                        commands: commands
                    });
                    console.log("\n" + "All tasks have been deleted." + "\n");
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log("\n" + err.message + "\n");
                    }
                    else {
                        console.log(err);
                    }
                }
                rl.prompt();
                break;
            }
            case "change":
            case "rename":
            case "update": {
                try {
                    (0, commandChange_1.commandChange)({
                        commands: commands,
                        db: db
                    });
                    console.log("\n" + "Task updated." + "\n");
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log("\n" + err.message + "\n");
                    }
                    else {
                        console.log(err);
                    }
                }
                rl.prompt();
                break;
            }
            case "save": {
                try {
                    (0, commandSave_1.commandSave)({
                        db: db,
                        commands: commands
                    });
                    console.log("\n" + "Database saved." + "\n");
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log("\n" + err.message + "\n");
                    }
                    else {
                        console.log(err);
                    }
                }
                rl.prompt();
                break;
            }
            case "c":
            case "clean":
            case "clear": {
                console.clear();
                rl.prompt();
                break;
            }
            case "exit":
            case "quit": {
                console.log("\n" + "Exiting..." + "\n");
                process.exit(0);
            }
            case "done":
            case "finish":
            case "complete":
            case "finished":
            case "check":
            case "conclude": {
                try {
                    (0, commandDone_1.commandDone)({
                        db: db,
                        commands: commands
                    });
                    console.log("\n" + "Task concluded." + "\n");
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log("\n" + err.message + "\n");
                    }
                    else {
                        console.log(err);
                    }
                }
                rl.prompt();
                break;
            }
            case "open":
            case "reopen":
            case "activate":
            case "reactivate":
            case "uncheck": {
                try {
                    (0, commandUndone_1.commandUndone)({
                        db: db,
                        commands: commands
                    });
                    console.log("Task has been reactivated.");
                }
                catch (err) {
                    if (err instanceof Error) {
                        console.log("\n" + err.message + "\n");
                    }
                    else {
                        console.log(err);
                    }
                }
                rl.prompt();
                break;
            }
            case "help":
            case "h": {
                console.log(texts_3.TXT_HELP);
                rl.prompt();
                break;
            }
            default: {
                console.log("\n" + "Unrecognized command." + "\n");
                rl.prompt();
            }
        }
    });
    rl.on("close", () => {
        console.log("\n" + "Exiting..." + "\n");
        process.exit(0);
    });
}
