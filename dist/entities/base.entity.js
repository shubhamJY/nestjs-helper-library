"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
class BaseEntity {
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Base entity constructor
     * @param partial - Partial object with data to be filtered and assigned to the entity
     * @param allowed - Array of allowed fields to be assigned
     */
    /******  36312f75-7122-44d0-a39e-86686cb9344a  *******/ constructor(partial, allowed = []) {
        this.allowed = [];
        // Object.assign(this, partial);
        this.allowed = allowed;
        this.filterAllowed(partial);
        if (this.hasOwnProperty("publishedStatus")) {
            this["publishedStatus"] = this["publishedStatus"];
        }
        this.cleanup();
    }
    filterAllowed(partial) {
        var _a;
        if (this.hasOwnProperty("allowed")) {
            (_a = this.allowed) === null || _a === void 0 ? void 0 : _a.map((a) => {
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
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map