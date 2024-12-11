import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
    private readonly logger = new Logger();
    catch(exception: HttpException, host: ArgumentsHost) {
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
            exceptionResponse = {
                ...{ statusCode: status },
                ...exceptionResponse,
            };
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
}
