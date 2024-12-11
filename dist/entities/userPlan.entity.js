"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPlanEntity = void 0;
const base_entity_1 = require("./base.entity");
class UserPlanEntity extends base_entity_1.BaseEntity {
    constructor(partial) {
        const allowed = [
            "planId",
            "name",
            "slug",
            "planNumber",
            "credits",
            "price",
            "currency",
            "duration",
            "isBestSeller",
            "isRecommended",
            "isVisible",
            "isActive",
            "isFree",
            "purchasedAt",
            "expiredAt",
        ];
        super(partial, allowed);
    }
}
exports.UserPlanEntity = UserPlanEntity;
//# sourceMappingURL=userPlan.entity.js.map