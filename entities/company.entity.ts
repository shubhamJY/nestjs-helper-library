import { AddressEntity } from "./address.entity";
import { BaseEntity } from "./base.entity";

export class CompanyEntity extends BaseEntity {
    constructor(partial: Partial<CompanyEntity>) {
        const allowed: any = [
            "_id",
            "userId",
            "name",
            "email",
            "phoneCode",
            "contact_number",
            "address",
            "taxId",
            "taxIdName",
            "isTaxIdVerified",
            "createdAt",
            "updatedAt",
        ];
        super(partial, allowed);

        if (partial.address) this.address = new AddressEntity(partial.address);
    }
}
