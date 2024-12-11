import { BaseEntity } from "./base.entity";

export class StateEntity extends BaseEntity {
    constructor(partial: Partial<StateEntity>) {
        const allowed: any = ["_id", "id", "name", "country_id", "gst_code"];
        super(partial, allowed);
    }
}
