import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File {

    @Prop()
    documentId: number;

    @Prop()
    name: string;

    @Prop()
    path: string;

    @Prop()
    uploadedBy: Number; // UserId

    @Prop()
    accessTo: Array<number>; // UserIds

    @Prop()
    active: boolean;
}

export type FileDocument = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
