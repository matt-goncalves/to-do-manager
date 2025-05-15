"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDatabase = loadDatabase;
const constants_1 = require("./constants");
const node_fs_1 = __importDefault(require("node:fs"));
function loadDatabase() {
    if (!node_fs_1.default.existsSync(constants_1.DB_LOCATION)) {
        throw new Error("Error: database file not found.");
    }
    const file = node_fs_1.default.readFileSync(constants_1.DB_LOCATION, "utf-8");
    return JSON.parse(file);
}
