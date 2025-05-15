"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDatabase = saveDatabase;
const extractTask_1 = require("../operations/extractTask");
const constants_1 = require("../constants");
const node_fs_1 = __importDefault(require("node:fs"));
function saveDatabase(db) {
    const tasks = db.map(task => {
        return (0, extractTask_1.extractTask)(task);
    });
    const data = JSON.stringify(tasks);
    try {
        // Copy backup first for non-destructive process
        node_fs_1.default.copyFileSync(constants_1.DB_LOCATION, constants_1.BKP_LOCATION);
        node_fs_1.default.writeFileSync(constants_1.DB_LOCATION, data, "utf-8");
    }
    catch (err) {
        console.error(err);
    }
}
