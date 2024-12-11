import mongoose from "mongoose";
import { BaseEntity } from "./base.entity";

export class CountryEntity extends BaseEntity {
    constructor(partial: Partial<CountryEntity>) {
        const allowed: any = [
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
                ? new mongoose.Types.ObjectId(`${partial._id}`)
                : partial._id;
    }
}
