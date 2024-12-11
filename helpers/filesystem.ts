import moment from "moment";
import { v4 as uuid } from "uuid";

export function genUUIDFileName(fileName: string) {
    return uuid() + "_" + fileName.split(" ").join("-");
}

export function genFileNameWithDate(fileName: string) {
    return moment().format("YYYYMMDD-HHmmss") + "_" + fileName.split(" ").join("-");
}

export function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // remove consecutive hyphens
    return str;
}
