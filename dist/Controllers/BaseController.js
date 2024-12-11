"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
class BaseController {
    respondBySearchWithPaginatedData() {
        return __awaiter(this, arguments, void 0, function* (query = {}, service, options = {}) {
            // const records = service.fetchAndSortFromSearchQueryWithRelations(query || {}, options);
            //
            const data = yield service.paginate(query, options);
            return this.respondWithPaginatedData(data.data.length + " records fetched", data.data, data.paginationData);
        });
    }
    respondWithPaginatedData(message, data = {}, paginationData) {
        return {
            statusText: "success",
            message: message,
            data: data,
            paginationData: paginationData,
        };
    }
    respondSuccess(message, data = {}) {
        return {
            statusText: "success",
            message: message,
            data: data,
        };
    }
    throwNotFoundException(message) {
        throw new common_1.NotFoundException({
            statusText: "fail",
            message: message,
        });
    }
    throwBadRequestException(message, error) {
        throw new common_1.BadRequestException({
            statusText: "fail",
            message: message,
            error: error,
        }, {
            cause: error,
        });
    }
    throwConflictException(message, error) {
        throw new common_1.ConflictException({
            statusText: "fail",
            message: message,
            errors: error.keyValue,
        }, {
            cause: error,
        });
    }
    throwInternalServerException(message, error = []) {
        throw new common_1.InternalServerErrorException({
            statusText: "fail",
            message: message,
        }, {
            cause: error,
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map