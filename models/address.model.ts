import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { AddressableTypes } from "../enums/AddressableTypes";

export type AddressDocument = Address & Document;

@Schema({ timestamps: true })
export class Address {
    @Prop({ type: String })
    line1: string;

    @Prop({ type: String, default: "" })
    line2: string;

    @Prop({
        required: true,
        type: MongooseSchema.Types.ObjectId,
        ref: "cities",
        index: true,
    })
    cityId: string;

    @Prop({ type: String, default: "" })
    cityName: string;

    @Prop({ type: String, default: "" })
    stateName: string;

    @Prop({ type: String, default: "" })
    countryName: string;

    @Prop({ type: String, default: "" })
    landmark: string;

    @Prop({ type: String, default: "", index: true })
    pincode: string;

    @Prop({ type: String, default: "" })
    full: string;

    // @Prop({ type: String, enum: AddressableTypes, default: '', index: true })
    // addressableType: AddressableTypes;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
