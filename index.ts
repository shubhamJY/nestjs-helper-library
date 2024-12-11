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

export { isUnique } from "./decorators/unique.decorator";
export { IsUniqueInterface } from "./decorators/unique.decorator";
export { IsUniqueConstraint } from "./decorators/unique.decorator";

export { isExists } from "./decorators/exists.decorator";
export { IsExistsInterface } from "./decorators/exists.decorator";
export { IsExistsConstraint } from "./decorators/exists.decorator";

export { Match } from "./decorators/match.decorator";

export { BaseEntity } from "./entities/base.entity";
export { AttachmentEntity } from "./entities/attachment.entity";
export { CompanyEntity } from "./entities/company.entity";
export { CityEntity } from "./entities/city.entity";
export { CountryEntity } from "./entities/country.entity";
export { StateEntity } from "./entities/state.entity";
export { UserEntity } from "./entities/user.entity";
export { UserPlanEntity } from "./entities/userPlan.entity";
export { AddressEntity } from "./entities/address.entity";
export { DefaultEntity } from "./entities/default.entity";
export { BrandEntity } from "./entities/brand.entity";
export { ListingEntity } from "./entities/listing.entity";

export { AddressModel, AddressDocument, AddressSchema } from "./models/address.model";
export { AttachmentModel, AttachmentDocument, AttachmentSchema } from "./models/attachment.model";

export { BaseResource } from "./resources/base.resource";

export { OtpMessageChannelTypesEnum } from "./enums/otpMessageChannelTypes.enum";
export { AddressableTypesEnum } from "./enums/addressableTypes.enum";
export { ListingTypesEnum } from "./enums/listingTypes.enum";
export { MandatoryValueEnum } from "./enums/mandatoryValue.enum";
export { UserRolesEnum } from "./enums/userRoles.enum";
export { DocumentFaceEnum } from "./enums/documentFace.enum";
export { GenderTypesEnum } from "./enums/genderTypes.enum";
export { MaritalStatusTypesEnum } from "./enums/maritalStatusTypes.enum";
export { CreditTransactionTypesEnum } from "./enums/creditTransactionTypes.enum";
export { PublishStateEnum } from "./enums/publishState.enum";
export { CreditTransactionForTypesEnum } from "./enums/creditTransactionForTypes.enum";
export { BookingStatusEnum } from "./enums/bookingStatus.enum";

export { AddressDto } from "./dtos/addressDto";

// export * as decorators from "./decorators";
// export * as entities from "./entities";
// export * as models from "./models";
// export * as resources from "./resources";
// export * as enums from "./enums";
// export * as dtos from "./dtos";
