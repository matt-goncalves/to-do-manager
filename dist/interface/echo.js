"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.echo = echo;
function echo(str, callback) {
    if (typeof str === "function") {
        callback = str;
        str = undefined;
    }
    console.log(str);
    if (callback) {
        callback();
    }
}
