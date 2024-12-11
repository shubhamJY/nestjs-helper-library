"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyEntity = void 0;
const address_entity_1 = require("./address.entity");
const base_entity_1 = require("./base.entity");
class CompanyEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = [
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
        if (partial.address)
            this.address = new address_entity_1.AddressEntity(partial.address);
    }
}
exports.CompanyEntity = CompanyEntity;
//# sourceMappingURL=company.entity.js.map