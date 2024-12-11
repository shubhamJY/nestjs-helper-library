"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEntity = void 0;
const base_entity_1 = require("./base.entity");
class DefaultEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = ["_id", "name"];
        super(partial, allowed);
    }
}
exports.DefaultEntity = DefaultEntity;
//# sourceMappingURL=default.entity.js.map