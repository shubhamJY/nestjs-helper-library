"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genUUIDFileName = genUUIDFileName;
exports.genFileNameWithDate = genFileNameWithDate;
exports.slugify = slugify;
const moment_1 = __importDefault(require("moment"));
const uuid_1 = require("uuid");
function genUUIDFileName(fileName) {
    return (0, uuid_1.v4)() + "_" + fileName.split(" ").join("-");
}
function genFileNameWithDate(fileName) {
    return (0, moment_1.default)().format("YYYYMMDD-HHmmss") + "_" + fileName.split(" ").join("-");
}
function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove consecutive hyphens
    return str;
}
//# sourceMappingURL=filesystem.js.map