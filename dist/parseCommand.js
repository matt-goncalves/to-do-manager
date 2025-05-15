"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommand = parseCommand;
function parseCommand(input) {
    const regex = /[^\s"]+="[^"]*"|[^\s"]+/g;
    const result = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
        if (match[1] !== undefined) {
            result.push(match[1]);
        }
        else {
            result.push(match[0]);
        }
    }
    return result;
}
