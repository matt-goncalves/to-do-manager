"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idExists = idExists;
const searchById_1 = require("../queries/searchById");
function idExists(id, db) {
    if ((0, searchById_1.searchById)(id, db)) {
        return true;
    }
    else {
        return false;
    }
}
