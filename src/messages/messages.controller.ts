import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  async createMessage(@Res() response, @Body() createMessageDto: CreateMessageDto) {
    try {
      const newUser = await this.messagesService.createMessage(createMessageDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Message has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Message not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:messageId')
  async getMessageBy(@Res() response, @Param('messageId') messageId: number) {
    try {
      const existingMessage = await this.messagesService.getMessageByMessageId(+messageId);
      return response.status(HttpStatus.OK).json({
        message: 'Message found successfully',
        existingMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('messagesByChatId/:chatId')
  async getMessagesByChatId(@Res() response, @Param('chatId') chatId: number) {
    try {
      const messages = await this.messagesService.getMessagesByChatId(+chatId);
      return response.status(HttpStatus.OK).json({
        message: 'Message found successfully',
        messages,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:messageId')
  async deleteMessage(@Res() response, @Param('messageId') messageId: number) {
    try {
      const deletedUser = await this.messagesService.deleteMessage(messageId);
      return response.status(HttpStatus.OK).json({
        message: 'Message deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
