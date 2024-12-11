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

export { BaseController } from "./controllers/BaseController";
export { BaseService } from "./services/BaseService";
