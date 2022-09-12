import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDocument } from './schema/message.schema';

@Injectable()
export class MessagesService {

  constructor(@InjectModel('Message') private messageModel: Model<MessageDocument>) { }

  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageDocument> {
    createMessageDto.active = true;
    const newChat = await new this.messageModel(createMessageDto);
    return newChat.save();
  }

  async getMessageByMessageId(messageId: number): Promise<MessageDocument> {
    const existingMessage = await this.messageModel.findOne({ messageId: messageId }).exec();
    if (!existingMessage) {
      throw new NotFoundException(`Message #${messageId} not found`);
    }
    return existingMessage;
  }

  async getMessagesByChatId(chatId: number): Promise<MessageDocument[]> {
    const messages = await this.messageModel.find({ chatId: chatId });
    if (!messages || messages.length == 0) {
      throw new NotFoundException('message data not found!');
    }
    return messages;
  }

  async getMessagesBy(discussionId: number): Promise<MessageDocument[]> {
    const messages = await this.messageModel.find({ discussionId: discussionId });
    if (!messages || messages.length == 0) {
      throw new NotFoundException('chats data not found!');
    }
    return messages;
  }

  async deleteMessage(messageId: number): Promise<MessageDocument> {
    const deletedMessage = await this.messageModel.findOneAndRemove({ messageId: messageId });
    if (!deletedMessage) {
      throw new NotFoundException(`Message #${messageId} not found`);
    }
    return deletedMessage;
  }

}
