"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const country_entity_1 = require("../country.entity");
const userPlan_entity_1 = require("../userPlan.entity");
class UserEntity {
    constructor(partial) {
        // Object.assign(this, partial);
        this._id =
            typeof partial._id == "string"
                ? new mongoose_1.default.Types.ObjectId(`${partial._id}`)
                : partial._id;
        this.name = partial.name;
        this.socketId = partial.socketId;
        this.email = partial.email;
        this.phoneCode = partial.phoneCode;
        this.contact_number = partial.contact_number;
        this.gender = partial.gender;
        this.plan = partial.plan;
        this.countryId =
            typeof partial.countryId == "string"
                ? new mongoose_1.default.Types.ObjectId(`${partial.countryId}`)
                : partial.countryId;
        if (partial.country)
            this.country = new country_entity_1.CountryEntity(partial.country);
        if (partial.plan)
            this.plan = new userPlan_entity_1.UserPlanEntity(partial.plan);
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map