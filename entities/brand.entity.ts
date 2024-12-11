import { BaseEntity } from "./base.entity";

export class BrandEntity extends BaseEntity {
    constructor(partial: Partial<BrandEntity>) {
        const allowed: any = ["_id", "name", "logoSrc", "image", "images", "slug"];
        super(partial, allowed);
    }
}
