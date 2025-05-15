"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendlyDate = friendlyDate;
function friendlyDate(dateToConvert) {
    return dateToConvert.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}
