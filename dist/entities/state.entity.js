"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateEntity = void 0;
const base_entity_1 = require("./base.entity");
class StateEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = ["_id", "id", "name", "country_id", "gst_code"];
        super(partial, allowed);
    }
}
exports.StateEntity = StateEntity;
//# sourceMappingURL=state.entity.js.map