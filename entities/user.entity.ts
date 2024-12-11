import mongoose from "mongoose";
import { CountryEntity } from "./country.entity";
import { UserPlanEntity } from "./userPlan.entity";

export class UserEntity {
    _id?: any | undefined;
    name?: string | undefined;
    countryId?: any | undefined;
    country?: any | undefined;
    socketId?: string | undefined;
    email?: string | undefined;
    phoneCode?: string | undefined;
    contact_number?: string | undefined;
    gender?: string | undefined;
    plan?: any | undefined;

    constructor(partial: Partial<UserEntity>) {
        // Object.assign(this, partial);
        this._id =
            typeof partial._id == "string"
                ? new mongoose.Types.ObjectId(`${partial._id}`)
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
                ? new mongoose.Types.ObjectId(`${partial.countryId}`)
                : partial.countryId;

        if (partial.country) this.country = new CountryEntity(partial.country);
        if (partial.plan) this.plan = new UserPlanEntity(partial.plan);
    }
}
