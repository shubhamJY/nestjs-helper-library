import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AttachmentDocument = AttachmentModel & Document;

@Schema({
    timestamps: true,
})
export class AttachmentModel {
    @Prop()
    filename: string;

    @Prop()
    url: string;

    @Prop()
    originalname: string;

    @Prop()
    encoding: string;

    @Prop()
    mimetype: string;

    @Prop()
    size: string;
}

export const AttachmentSchema = SchemaFactory.createForClass(AttachmentModel);
