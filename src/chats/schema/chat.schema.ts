import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Message } from "src/messages/schema/message.schema";

@Schema()
export class Chat {
    @Prop()
    chatEntityId: number;

    @Prop()
    title: string;

    @Prop()
    owner: number; //UserId

    @Prop()
    messages: Array<Message>;

    @Prop()
    participants: Array<number>; // userIds

    @Prop()
    active: boolean;
}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
