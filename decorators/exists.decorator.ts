import { Injectable } from "@nestjs/common";
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import mongoose from "mongoose";

// decorator options interface
export type IsExistsInterface = {
    each?: boolean;
    tableName: string;
    column: string;
    isMongoId?: boolean;
};

// decorator function
export function isExists(options: IsExistsInterface, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: "isExists",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsExistsConstraint,
        });
    };
}

@ValidatorConstraint({ name: "IsExistsConstraint", async: true })
@Injectable()
export class IsExistsConstraint implements ValidatorConstraintInterface {
    message: string;
    constructor() {}
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const { each, isMongoId, tableName, column }: IsExistsInterface = args?.constraints[0];

        let query: any = {
            [column]: value,
        };

        if (isMongoId) {
            try {
                query = {
                    [column]: new mongoose.Types.ObjectId(`${value.toString()}`),
                };
            } catch (error) {}
        }

        let valArr: any = [];

        if (each) {
            valArr = [...value];
            if (isMongoId) {
                valArr = valArr
                    .map((v) => {
                        try {
                            return new mongoose.Types.ObjectId(`${v.toString()}`);
                        } catch (error) {
                            return v;
                        }
                    })
                    .filter((v) => v !== null);
            }

            query = {
                [column]: {
                    $in: valArr,
                },
            };
        }

        const checkExists = await mongoose.connection.collection(tableName).find(query).toArray();

        if (each) {
            const notExistingIndexes: any = [];
            valArr.map((v, index) => {
                if (!checkExists[index]) {
                    notExistingIndexes.push(index);
                }
                return v;
            });

            this.message = `${args?.property} index's ${notExistingIndexes.join(
                ",",
            )} does not exist`;
            return notExistingIndexes && notExistingIndexes.length > 0 ? false : true;
        }

        this.message = `${args?.property} does not exist`;
        return checkExists && checkExists.length > 0 ? true : false;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        // return custom field message
        // const field: string = validationArguments.property;

        return this.message;
    }
}
