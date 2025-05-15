"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BKP_LOCATION = exports.DB_LOCATION = void 0;
const node_path_1 = __importDefault(require("node:path"));
exports.DB_LOCATION = node_path_1.default.join(__dirname, "../data/tasks.json");
exports.BKP_LOCATION = node_path_1.default.join(__dirname, "../data/.tasks_bkp.json");
