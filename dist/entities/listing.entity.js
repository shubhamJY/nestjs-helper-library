"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingEntity = void 0;
const base_entity_1 = require("./base.entity");
const brand_entity_1 = require("./brand.entity");
const default_entity_1 = require("./default.entity");
const user_entity_1 = require("./user/user.entity");
class ListingEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = [
            "_id",
            "vendorId",
            "vendor",
            "name",
            "slug",
            "listingNumber",
            "images",
            "vehicleType",
            "brand",
            "carType",
            "model",
            "year",
            "seats",
            "doors",
            "features",
            "interiorColors",
            "exteriorColors",
            "fuelType",
            "transmissionType",
            "hourlyPrice",
            "hourlyPriceLimit",
            "dailyPrice",
            "dailyPriceLimit",
            "weeklyPrice",
            "weeklyPriceLimit",
            "monthlyPrice",
            "monthlyPriceLimit",
            "excessClaim",
            "tollCharge",
            "additionalDriverInsurance",
            "additionalMileageCharge",
            "securityDeposit",
            "views",
            "availableFrom",
            "availableTo",
        ];
        super(partial, allowed);
        if (partial.vendor)
            this.vendor = new user_entity_1.UserEntity(partial.vendor);
        if (partial.brand)
            this.brand = new brand_entity_1.BrandEntity(partial.brand);
        if (partial.model)
            this.model = new default_entity_1.DefaultEntity(partial.model);
        if (partial.vehicleType)
            this.vehicleType = new default_entity_1.DefaultEntity(partial.vehicleType);
        if (partial.carType)
            this.carType = new default_entity_1.DefaultEntity(partial.carType);
        if (partial.fuelType)
            this.fuelType = new default_entity_1.DefaultEntity(partial.fuelType);
        if (partial.transmissionType)
            this.transmissionType = new default_entity_1.DefaultEntity(partial.transmissionType);
    }
}
exports.ListingEntity = ListingEntity;
//# sourceMappingURL=listing.entity.js.map