"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = exports.BaseController = void 0;
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
var BaseController_1 = require("./controllers/BaseController");
Object.defineProperty(exports, "BaseController", { enumerable: true, get: function () { return BaseController_1.BaseController; } });
var BaseService_1 = require("./services/BaseService");
Object.defineProperty(exports, "BaseService", { enumerable: true, get: function () { return BaseService_1.BaseService; } });
//# sourceMappingURL=index.js.map