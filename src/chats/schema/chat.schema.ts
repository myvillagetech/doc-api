import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Message } from "src/messages/schema/message.schema";

@Schema()
export class Chat {
    
    @Prop()
    chatId: number;

    @Prop()
    title: string;

    @Prop()
    discussionId: number;

    @Prop()
    participants: Array<number>; // userIds

    @Prop()
    owner: number;

    @Prop()
    active: boolean;
}

export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
