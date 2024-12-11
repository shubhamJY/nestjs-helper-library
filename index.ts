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
export { ListingTypesEnum } from "./enums/listingTypes.enum";

export { isUnique } from "./decorators/unique.decorator";
export { IsUniqueInterface } from "./decorators/unique.decorator";
export { IsUniqueConstraint } from "./decorators/unique.decorator";

export { isExists } from "./decorators/exists.decorator";
export { IsExistsInterface } from "./decorators/exists.decorator";
export { IsExistsConstraint } from "./decorators/exists.decorator";

export { Match } from "./decorators/match.decorator";

export { BaseService } from "./Services/BaseService";

export { AddressableTypes } from "./enums/AddressableTypes";
export { OtpMessageChannelTypes } from "./enums/OtpMessageChannelTypes";
export { DocumentFace } from "./enums/DocumentFace";
