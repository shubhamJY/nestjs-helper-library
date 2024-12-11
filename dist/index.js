"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
__exportStar(require("./decorators"), exports);
__exportStar(require("./enums"), exports);
__exportStar(require("./entities"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./resources"), exports);
__exportStar(require("./enums"), exports);
__exportStar(require("./dtos"), exports);
//# sourceMappingURL=index.js.map