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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = exports.AddressModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AddressModel = class AddressModel {
};
exports.AddressModel = AddressModel;
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AddressModel.prototype, "line1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], AddressModel.prototype, "line2", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "cities",
        index: true,
    }),
    __metadata("design:type", String)
], AddressModel.prototype, "cityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], AddressModel.prototype, "cityName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], AddressModel.prototype, "stateName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], AddressModel.prototype, "countryName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], AddressModel.prototype, "landmark", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "", index: true }),
    __metadata("design:type", String)
], AddressModel.prototype, "pincode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], AddressModel.prototype, "full", void 0);
exports.AddressModel = AddressModel = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AddressModel);
exports.AddressSchema = mongoose_1.SchemaFactory.createForClass(AddressModel);
//# sourceMappingURL=address.model.js.map