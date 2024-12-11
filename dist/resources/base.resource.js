"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResource = void 0;
class BaseResource {
    constructor(partial, allowed = [], strings = []) {
        this.allowed = [];
        this.strings = [];
        // Object.assign(this, partial);
        this.allowed = allowed;
        this.strings = strings;
        this.filterAllowed(partial);
        this.setStrings();
        if (this.hasOwnProperty('_id')) {
            this['_id'] = this['_id'] ? this['_id'].toString() : '';
        }
        if (this.hasOwnProperty('name')) {
            this['name'] = this['name'];
        }
        if (this.hasOwnProperty('publishedStatus')) {
            this['publishedStatus'] = this['publishedStatus'];
        }
        this.cleanup();
    }
    filterAllowed(partial) {
        if (this.hasOwnProperty('allowed')) {
            this.allowed.map(a => {
                if (partial[a] !== undefined) {
                    this[a] = this[a] = partial[a];
                }
            });
            // const filtered = Object.keys(partial)
            // .filter(key => this.allowed.includes(key))
            // .reduce((obj, key) => {
            //     console.log({obj, key})
            //     obj[key] = partial[key];
            //     return obj;
            // }, {});
            // Object.assign(this, filtered);
        }
    }
    setStrings() {
        if (this.hasOwnProperty('strings')) {
            this.strings.map(s => {
                if (this.hasOwnProperty(s)) {
                    if (Array.isArray(this[s])) {
                        this[s] = this[s].map(as => (as ? as.toString() : as));
                    }
                    else {
                        this[s] = this[s] !== undefined ? this[s].toString() : this[s];
                    }
                }
            });
        }
    }
    cleanup() {
        delete this.strings;
        delete this.allowed;
    }
}
exports.BaseResource = BaseResource;
//# sourceMappingURL=base.resource.js.map