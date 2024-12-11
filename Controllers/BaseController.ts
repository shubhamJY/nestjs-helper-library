import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";

export class BaseController {
    async respondBySearchWithPaginatedData(query: any = {}, service: any, options = {}) {
        // const records = service.fetchAndSortFromSearchQueryWithRelations(query || {}, options);
        //

        const data = await service.paginate(query, options);
        return this.respondWithPaginatedData(
            data.data.length + " records fetched",
            data.data,
            data.paginationData,
        );
    }

    respondWithPaginatedData(message: string, data: any = {}, paginationData: any) {
        return {
            statusText: "success",
            message: message,
            data: data,
            paginationData: paginationData,
        };
    }

    respondSuccess(message: string, data: any = {}) {
        return {
            statusText: "success",
            message: message,
            data: data,
        };
    }

    throwNotFoundException(message: string) {
        throw new NotFoundException({
            statusText: "fail",
            message: message,
        });
    }

    throwBadRequestException(message: string, error: any) {
        throw new BadRequestException(
            {
                statusText: "fail",
                message: message,
                error: error,
            },
            {
                cause: error,
            },
        );
    }

    throwConflictException(message: string, error: any) {
        throw new ConflictException(
            {
                statusText: "fail",
                message: message,
                errors: error.keyValue,
            },
            {
                cause: error,
            },
        );
    }

    throwInternalServerException(message: string, error: any = []) {
        throw new InternalServerErrorException(
            {
                statusText: "fail",
                message: message,
            },
            {
                cause: error,
            },
        );
    }
}
