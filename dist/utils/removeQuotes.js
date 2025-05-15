"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeQuotes = removeQuotes;
function removeQuotes(str) {
    return str.replace(/^['"]|['"]$/g, '');
}
