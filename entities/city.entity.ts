import { BaseEntity } from "./base.entity";

export class CityEntity extends BaseEntity {
    constructor(partial: Partial<CityEntity>) {
        const allowed: any = ["_id", "id", "name", "state_id", "country_id"];
        super(partial, allowed);
    }
}
