"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = createDatabase;
const constants_1 = require("./constants");
const node_fs_1 = __importDefault(require("node:fs"));
function createDatabase() {
    const data = "[]";
    try {
        node_fs_1.default.writeFileSync(constants_1.DB_LOCATION, data, "utf-8");
    }
    catch (err) {
        console.error(err);
    }
}
