import { BaseEntity } from "./base.entity";

export class AddressEntity extends BaseEntity {
    _id: string | any;
    line1: string | any;
    line2: string | any;
    landmark: string | any;
    pincode: string | any;
    cityId: string | any;
    cityName: string | any;
    stateName: string | any;
    countryName: string | any;
    full: string | any;
    addressableType: string | any;
    createdAt: Date | any;
    updatedAt: Date | any;
    constructor(partial: Partial<AddressEntity>) {
        const allowed: any = [
            "_id",
            "line1",
            "line2",
            "landmark",
            "pincode",
            "cityId",
            "cityName",
            "stateName",
            "countryName",
            "full",
            "addressableType",
            "createdAt",
            "updatedAt",
        ];
        super(partial, allowed);
    }
}
