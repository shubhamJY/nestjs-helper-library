import mongoose from "mongoose";
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("nest-lib-common: - Mongo DB connected");
    })
    .catch((err) => {
        console.log(err);
    });

export { BaseController } from "./Controllers/BaseController";
export { BaseService } from "./Services/BaseService";

export { AddressModel, AddressDocument, AddressSchema } from "./models/address.model";

export * as decorators from "./decorators";
export * as entities from "./entities";
export * as models from "./models";
export * as resources from "./resources";
export * as enums from "./enums";
export * as dtos from "./dtos";
