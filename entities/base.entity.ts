export abstract class BaseEntity {
    [x: string]: any;

    protected allowed?: any = [];

    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Base entity constructor
     * @param partial - Partial object with data to be filtered and assigned to the entity
     * @param allowed - Array of allowed fields to be assigned
     */
    /******  36312f75-7122-44d0-a39e-86686cb9344a  *******/ constructor(
        partial: any,
        allowed = [],
    ) {
        // Object.assign(this, partial);
        this.allowed = allowed;
        this.filterAllowed(partial);

        if (this.hasOwnProperty("publishedStatus")) {
            this["publishedStatus"] = this["publishedStatus"];
        }

        this.cleanup();
    }

    filterAllowed(partial: any) {
        if (this.hasOwnProperty("allowed")) {
            this.allowed?.map((a: any) => {
                if (partial[a]) {
                    this[a] = this[a] = partial[a];
                }
            });
        }
    }

    cleanup() {
        delete this.allowed;
    }
}
