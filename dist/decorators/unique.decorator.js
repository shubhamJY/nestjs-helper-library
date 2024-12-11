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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.IsUniqueConstraint = void 0;
exports.isUnique = isUnique;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
// decorator function
function isUnique(options, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isUnique",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint,
        });
    };
}
let IsUniqueConstraint = class IsUniqueConstraint {
    constructor() { }
    validate(value, args, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // catch options from decorator
            const { tableName, column, except } = args === null || args === void 0 ? void 0 : args.constraints[0];
            const requestParams = args === null || args === void 0 ? void 0 : args.object;
            const query = {
                [column]: value,
            };
            if (except) {
                query["_id"] = { $ne: requestParams._id };
            }
            const checkExists = yield mongoose_1.default.connection.collection(tableName).findOne(query);
            if (except && checkExists) {
                return true;
            }
            return checkExists ? false : true;
        });
    }
    defaultMessage(validationArguments) {
        // return custom field message
        const field = validationArguments.property;
        return `${field} field already exist`;
    }
};
exports.IsUniqueConstraint = IsUniqueConstraint;
__decorate([
    __param(2, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], IsUniqueConstraint.prototype, "validate", null);
exports.IsUniqueConstraint = IsUniqueConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsUniqueConstraint", async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IsUniqueConstraint);
//# sourceMappingURL=unique.decorator.js.map