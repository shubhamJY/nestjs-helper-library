import { BaseEntity } from "./base.entity";
import mongoose from "mongoose";

export class UserPlanEntity extends BaseEntity {
    planId?: mongoose.Types.ObjectId | any;
    name?: string | any;
    slug?: string | any;
    planNumber?: number | any;
    credits?: number | any;
    price?: number | any;
    currency?: string | any;
    duration?: string | any;
    isBestSeller?: boolean | any;
    isRecommended?: boolean | any;
    isVisible?: boolean | any;
    isActive?: boolean | any;
    isFree?: boolean | any;
    purchasedAt?: Date | any;
    expiredAt?: Date | any;

    constructor(partial: Partial<UserPlanEntity>) {
        const allowed: any = [
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
