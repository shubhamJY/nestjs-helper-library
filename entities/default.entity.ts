import { BaseEntity } from "./base.entity";

export class DefaultEntity extends BaseEntity {
    constructor(partial: Partial<DefaultEntity>) {
        const allowed: any = ["_id", "name"];
        super(partial, allowed);
    }
}
