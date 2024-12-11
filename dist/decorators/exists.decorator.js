"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsExistsConstraint = void 0;
exports.isExists = isExists;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
// decorator function
function isExists(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isExists",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsExistsConstraint,
        });
    };
}
let IsExistsConstraint = class IsExistsConstraint {
    constructor() { }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { each, isMongoId, tableName, column, nullable } = args === null || args === void 0 ? void 0 : args.constraints[0];
            if (nullable) {
                return true;
            }
            let query = {
                [column]: value,
            };
            if (isMongoId) {
                try {
                    query = {
                        [column]: new mongoose_1.default.Types.ObjectId(`${value.toString()}`),
                    };
                }
                catch (error) { }
            }
            let valArr = [];
            if (each && Array.isArray(value)) {
                valArr = [...value];
                if (isMongoId) {
                    valArr = valArr
                        .map((v) => {
                        try {
                            return new mongoose_1.default.Types.ObjectId(`${v.toString()}`);
                        }
                        catch (error) {
                            return v;
                        }
                    })
                        .filter((v) => v !== null);
                }
                query = {
                    [column]: {
                        $in: valArr,
                    },
                };
            }
            const checkExists = yield mongoose_1.default.connection.collection(tableName).find(query).toArray();
            if (each) {
                const notExistingIndexes = [];
                valArr.map((v, index) => {
                    if (!checkExists[index]) {
                        notExistingIndexes.push(index);
                    }
                    return v;
                });
                this.message = `${args === null || args === void 0 ? void 0 : args.property} index's ${notExistingIndexes.join(",")} does not exist`;
                return notExistingIndexes && notExistingIndexes.length > 0 ? false : true;
            }
            this.message = `${args === null || args === void 0 ? void 0 : args.property} does not exist`;
            return checkExists && checkExists.length > 0 ? true : false;
        });
    }
    defaultMessage(validationArguments) {
        // return custom field message
        // const field: string = validationArguments.property;
        return this.message;
    }
};
exports.IsExistsConstraint = IsExistsConstraint;
exports.IsExistsConstraint = IsExistsConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsExistsConstraint", async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IsExistsConstraint);
//# sourceMappingURL=exists.decorator.js.map