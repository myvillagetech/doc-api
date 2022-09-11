import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Chat } from "src/chats/schema/chat.schema";

@Schema()
export class Discussion {

    @Prop()
    discussionId: number;

    @Prop()
    title:string;
   
    @Prop()
    participants: Array<number>; // userIds

    @Prop()
    owner: number; // userId

    @Prop()
    status: string;

    @Prop()
    active: boolean;
}

export type DiscussionDocument = Discussion & Document;
export const DiscussionSchema = SchemaFactory.createForClass(Discussion);
