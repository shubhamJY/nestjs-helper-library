"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressEntity = void 0;
const base_entity_1 = require("./base.entity");
class AddressEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = [
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
exports.AddressEntity = AddressEntity;
//# sourceMappingURL=address.entity.js.map