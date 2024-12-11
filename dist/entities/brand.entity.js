"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandEntity = void 0;
const base_entity_1 = require("./base.entity");
class BrandEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = ["_id", "name", "logoSrc", "image", "images", "slug"];
        super(partial, allowed);
    }
}
exports.BrandEntity = BrandEntity;
//# sourceMappingURL=brand.entity.js.map