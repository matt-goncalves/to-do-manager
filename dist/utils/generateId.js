"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
const idExists_1 = require("../queries/idExists");
function generateId(db) {
    let counter = db.length;
    while ((0, idExists_1.idExists)(String(counter), db)) {
        counter++;
    }
    return String(counter);
}
