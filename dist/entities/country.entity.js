"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const base_entity_1 = require("./base.entity");
class CountryEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = [
            "_id",
            "id",
            "name",
            "iso2",
            "iso3",
            "currency",
            "currency_symbol",
            "currency_name",
            "emoji",
            "phone_code",
        ];
        super(partial, allowed);
        this._id =
            typeof partial._id == "string"
                ? new mongoose_1.default.Types.ObjectId(`${partial._id}`)
                : partial._id;
    }
}
exports.CountryEntity = CountryEntity;
//# sourceMappingURL=country.entity.js.map