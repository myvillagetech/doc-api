import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatDocument } from './schema/chat.schema';

@Injectable()
export class ChatsService {

  constructor(@InjectModel('Chat') private chatModel: Model<ChatDocument>) { }

  async createChat(createChatDto: CreateChatDto): Promise<ChatDocument> {
    createChatDto.active = true;
    const newUser = await new this.chatModel(createChatDto);
    return newUser.save();
  }

  async updateChat(chatId: number, updateChatDto: UpdateChatDto): Promise<ChatDocument> {
    const existingChat = await this.chatModel.findOneAndUpdate(
      { chatId: chatId },
      updateChatDto,
      { new: true },
    );
    if (!existingChat) {
      throw new NotFoundException(`user #${chatId} not found`);
    }
    return existingChat;
  }

  async getChatBy(ownerId: number): Promise<ChatDocument> {
    const existingChat = await this.chatModel.findOne({ ownerId: ownerId }).exec();
    if (!existingChat) {
      throw new NotFoundException(`user #${ownerId} not found`);
    }
    return existingChat;
  }

  async getChatsBy(discussionId: number, ownerId: number): Promise<ChatDocument[]> {
    var query = { $and: [{ discussionId: { $regex: discussionId, $options: 'i' } }, { ownerId: { $regex: ownerId, $options: 'i' } }] };
    const existingChats = await this.chatModel.find(query);
    if (!existingChats || existingChats.length == 0) {
      throw new NotFoundException('chats data not found!');
    }
    return existingChats;
  }

  async getChatsByDiscussionId(discussionId: number): Promise<ChatDocument[]> {
    const existingChats = await this.chatModel.find({ discussionId: discussionId });
    if (!existingChats || existingChats.length == 0) {
      throw new NotFoundException('chats data not found!');
    }
    return existingChats;
  }

  async addChatParticipants(chatId: number, participants: Array<number>): Promise<ChatDocument> {
    const existingChat = await this.chatModel.findByIdAndUpdate(
      chatId,
      participants,
      { new: true },
    );
    if (!existingChat) {
      throw new NotFoundException(`chat #${chatId} not found`);
    }
    return existingChat;
  }

  deleteChatParticipants(chatId: number, participants: Array<number>) {
    return `This action updates a #${chatId} chat`;
  }

  async deleteChat(chatId: number): Promise<ChatDocument> {
    const deletedChat = await this.chatModel.findOneAndRemove({ chatId: chatId });
    if (!deletedChat) {
      throw new NotFoundException(`chat #${chatId} not found`);
    }
    return deletedChat;
  }

}
