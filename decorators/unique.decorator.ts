import { Injectable, Param, Req } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { Connection } from "mongoose";

// decorator options interface
export type IsUniqueInterface = {
    tableName: string;
    column: string;
    except?: string | null;
};

// decorator function
export function isUnique(options: IsUniqueInterface, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "isUnique",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsUniqueConstraint,
        });
    };
}

@ValidatorConstraint({ name: "IsUniqueConstraint", async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectConnection() private readonly connection: Connection) {}
    async validate(
        value: any,
        args?: ValidationArguments,
        @Param("id") id?: any,
    ): Promise<boolean> {
        // catch options from decorator
        const { tableName, column, except }: IsUniqueInterface = args.constraints[0];
        const requestParams: any = args.object;
        const checkExcept = ["", undefined, null].includes(except) ? false : true;

        const query = {
            [column]: value,
        };

        if (checkExcept) {
            query[except] = { $ne: requestParams[except] };
        }

        const checkExists = await this.connection.collection(tableName).findOne(query);

        if (checkExcept && checkExists) {
            return false;
        }

        return checkExists ? false : true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        // return custom field message
        const field: string = validationArguments.property;
        return `${field} field already exist`;
    }
}
