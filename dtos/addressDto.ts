import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max } from "class-validator";
import { AddressableTypesEnum } from "../enums/addressableTypes.enum";

export class AddressDto {
    @IsNotEmpty()
    @IsString()
    line1: string;

    @IsOptional()
    @IsString()
    line2: string;

    @IsNotEmpty()
    @IsString()
    cityId: string;

    @IsOptional()
    @IsString()
    landmark: string;

    @IsNotEmpty()
    @IsString()
    pincode: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(AddressableTypesEnum)
    addressableType: AddressableTypesEnum;
}
