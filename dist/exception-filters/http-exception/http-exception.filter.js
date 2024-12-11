"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger();
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        // const request = ctx.getRequest();
        let status = 500;
        if (typeof exception.getStatus === 'function') {
            status = exception.getStatus();
        }
        // const message = exception.message;
        let exceptionResponse = null;
        if (typeof exception.getResponse === 'function') {
            exceptionResponse = exception.getResponse();
            if (status == 400) {
                let message = exceptionResponse.message;
                let errors = exceptionResponse.error;
                if (typeof message == 'object' && typeof errors == 'string') {
                    const temp = message;
                    message = errors;
                    errors = temp;
                }
                Object.assign(exceptionResponse, { statusText: 'fail' });
                Object.assign(exceptionResponse, { errors: errors });
                Object.assign(exceptionResponse, { message: message });
                Object.assign(exceptionResponse, {
                    validationErrors: true,
                });
                delete exceptionResponse.error;
            }
        }
        // path: request.url
        if (typeof exceptionResponse === 'object') {
            exceptionResponse = Object.assign({ statusCode: status }, exceptionResponse);
        }
        if (status >= 400 && status < 500) {
            this.logger.warn(exception);
        }
        if (status >= 500) {
            this.logger.error(exception);
            this.logger.error(exception.cause);
        }
        response.status(status).json(exceptionResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map