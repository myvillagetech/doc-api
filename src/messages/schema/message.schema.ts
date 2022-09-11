import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Message {

    @Prop()
    messageId: number;

    @Prop()
    chartId: number;

    @Prop()
    sender: number; // UserId

    @Prop()
    message: string;

    @Prop()
    messageType: string;

    @Prop()
    createdDate: Date;

    @Prop()
    active: boolean;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
