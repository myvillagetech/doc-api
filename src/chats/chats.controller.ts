import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@ApiTags('chats')
@Controller('/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post()
  async createChat(@Res() response, @Body() createChatDto: CreateChatDto) {
    try {
      const newChat = await this.chatsService.createChat(createChatDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Chat has been created successfully',
        newChat,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Chat not created!',
        error: 'Bad Request',
      });
    }
  }

  @Patch(':chatId')
  addChatParticipants(@Param('chatId') chatId: number, @Body() participants: Array<number>) {
    return this.chatsService.addChatParticipants(+chatId, participants);
  }

  @Patch(':chatId')
  deleteChatParticipants(@Param('chatId') chatId: number, @Body() participants: Array<number>) {
    return this.chatsService.deleteChatParticipants(+chatId, participants);
  }

  @Put(':chatId')
  async updateChat(@Res() response, @Param('chatId') chatId: number, @Body() updateChatDto: UpdateChatDto) {
    try {
      const existingChat = await this.chatsService.updateChat(chatId, updateChatDto);
      return response.status(HttpStatus.OK).json({
        message: 'Chat has been successfully updated',
        existingChat,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:chatId')
  async deleteChat(@Res() response, @Param('chatId') chatId: number) {
    try {
      const deletedChat = await this.chatsService.deleteChat(chatId);
      return response.status(HttpStatus.OK).json({
        message: 'Chat deleted successfully',
        deletedChat,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':ownerId')
  async getChatBy(@Res() response, @Param('ownerId') ownerId: number) {
    try {
      const existingChat = await this.chatsService.getChatBy(+ownerId);
      return response.status(HttpStatus.OK).json({
        message: 'Chat found successfully',
        existingChat,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':discussionId')
  async getChatsByDiscussionId(@Res() response, @Param('discussionId') discussionId: number) {
    try {
      const existingChats = await this.chatsService.getChatsByDiscussionId(+discussionId);
      return response.status(HttpStatus.OK).json({
        message: 'Chat found successfully',
        existingChats,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:discussionId/:ownerId')
  async getChatsBy(@Res() response, @Param('discussionId') discussionId: number, @Param('ownerId') ownerId: number) {
    try {
      const existingChats = await this.chatsService.getChatsBy(+discussionId, +ownerId);
      return response.status(HttpStatus.OK).json({
        message: 'Chat found successfully',
        existingChats,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
