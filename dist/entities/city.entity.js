"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityEntity = void 0;
const base_entity_1 = require("./base.entity");
class CityEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = ["_id", "id", "name", "state_id", "country_id"];
        super(partial, allowed);
    }
}
exports.CityEntity = CityEntity;
//# sourceMappingURL=city.entity.js.map