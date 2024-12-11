import { BaseEntity } from "./base.entity";
import { BrandEntity } from "./brand.entity";
import { DefaultEntity } from "./default.entity";
import { UserEntity } from "./user/user.entity";

export class ListingEntity extends BaseEntity {
    constructor(partial: Partial<ListingEntity>) {
        const allowed: any = [
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

        if (partial.vendor) this.vendor = new UserEntity(partial.vendor);

        if (partial.brand) this.brand = new BrandEntity(partial.brand);

        if (partial.model) this.model = new DefaultEntity(partial.model);

        if (partial.vehicleType) this.vehicleType = new DefaultEntity(partial.vehicleType);

        if (partial.carType) this.carType = new DefaultEntity(partial.carType);

        if (partial.fuelType) this.fuelType = new DefaultEntity(partial.fuelType);

        if (partial.transmissionType)
            this.transmissionType = new DefaultEntity(partial.transmissionType);
    }
}
