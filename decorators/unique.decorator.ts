import { Injectable, Param, Req } from "@nestjs/common";
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import mongoose from "mongoose";

// decorator options interface
export type IsUniqueInterface = {
    tableName: string;
    column: string;
    except?: string | boolean | null;
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
    constructor() {}
    async validate(
        value: any,
        args?: ValidationArguments,
        @Param("id") id?: any,
    ): Promise<boolean> {
        // catch options from decorator
        const { tableName, column, except }: IsUniqueInterface = args?.constraints[0];
        const requestParams: any = args?.object;

        const query = {
            [column]: value,
        };

        if (except) {
            query["_id"] = { $ne: requestParams._id };
        }

        const checkExists = await mongoose.connection.collection(tableName).findOne(query);

        if (except && checkExists) {
            return true;
        }

        return checkExists ? false : true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        // return custom field message
        const field: string = validationArguments.property;
        return `${field} field already exist`;
    }
}
