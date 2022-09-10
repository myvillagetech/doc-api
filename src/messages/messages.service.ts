import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageDocument } from './schema/message.schema';

@Injectable()
export class MessagesService {

  constructor(@InjectModel('Message') private messageModel: Model<MessageDocument>) { }

  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageDocument> {
    const newUser = await new this.messageModel(createMessageDto);
    return newUser.save();
  }

  async getMessagesBy(chatId: number): Promise<MessageDocument> {
    const existingMessage = await this.messageModel.findById(chatId).exec();
    if (!existingMessage) {
      throw new NotFoundException(`user #${chatId} not found`);
    }
    return existingMessage;
  }

  async deleteMessage(userId: number): Promise<MessageDocument> {
    const deletedMessage = await this.messageModel.findByIdAndDelete(userId);
    if (!deletedMessage) {
      throw new NotFoundException(`user #${userId} not found`);
    }
    return deletedMessage;
  }

}
