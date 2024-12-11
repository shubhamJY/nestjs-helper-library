"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResource = exports.AddressableTypes = exports.AddressDto = exports.DocumentFace = exports.OtpMessageChannelTypes = exports.BaseService = exports.Match = exports.IsExistsConstraint = exports.isExists = exports.IsUniqueConstraint = exports.isUnique = exports.ListingTypesEnum = exports.BaseController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("nest-lib-common: - Mongo DB connected");
})
    .catch((err) => {
    console.log(err);
});
var BaseController_1 = require("./Controllers/BaseController");
Object.defineProperty(exports, "BaseController", { enumerable: true, get: function () { return BaseController_1.BaseController; } });
var listingTypes_enum_1 = require("./enums/listingTypes.enum");
Object.defineProperty(exports, "ListingTypesEnum", { enumerable: true, get: function () { return listingTypes_enum_1.ListingTypesEnum; } });
var unique_decorator_1 = require("./decorators/unique.decorator");
Object.defineProperty(exports, "isUnique", { enumerable: true, get: function () { return unique_decorator_1.isUnique; } });
var unique_decorator_2 = require("./decorators/unique.decorator");
Object.defineProperty(exports, "IsUniqueConstraint", { enumerable: true, get: function () { return unique_decorator_2.IsUniqueConstraint; } });
var exists_decorator_1 = require("./decorators/exists.decorator");
Object.defineProperty(exports, "isExists", { enumerable: true, get: function () { return exists_decorator_1.isExists; } });
var exists_decorator_2 = require("./decorators/exists.decorator");
Object.defineProperty(exports, "IsExistsConstraint", { enumerable: true, get: function () { return exists_decorator_2.IsExistsConstraint; } });
var match_decorator_1 = require("./decorators/match.decorator");
Object.defineProperty(exports, "Match", { enumerable: true, get: function () { return match_decorator_1.Match; } });
var BaseService_1 = require("./Services/BaseService");
Object.defineProperty(exports, "BaseService", { enumerable: true, get: function () { return BaseService_1.BaseService; } });
var OtpMessageChannelTypes_1 = require("./enums/OtpMessageChannelTypes");
Object.defineProperty(exports, "OtpMessageChannelTypes", { enumerable: true, get: function () { return OtpMessageChannelTypes_1.OtpMessageChannelTypes; } });
var DocumentFace_1 = require("./enums/DocumentFace");
Object.defineProperty(exports, "DocumentFace", { enumerable: true, get: function () { return DocumentFace_1.DocumentFace; } });
var addressDto_1 = require("./dto/addressDto");
Object.defineProperty(exports, "AddressDto", { enumerable: true, get: function () { return addressDto_1.AddressDto; } });
var AddressableTypes_1 = require("./enums/AddressableTypes");
Object.defineProperty(exports, "AddressableTypes", { enumerable: true, get: function () { return AddressableTypes_1.AddressableTypes; } });
var base_resource_1 = require("./resources/base.resource");
Object.defineProperty(exports, "BaseResource", { enumerable: true, get: function () { return base_resource_1.BaseResource; } });
//# sourceMappingURL=index.js.map