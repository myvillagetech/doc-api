import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';

@ApiTags('discussions')
@Controller('/discussions')
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) { }

  @Post()
  async createDiscussion(@Res() response, @Body() createDiscussionDto: CreateDiscussionDto) {
    try {
      const newDiscussion = await this.discussionsService.createDiscussion(createDiscussionDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Discussion has been created successfully',
        newDiscussion,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Discussion not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getDiscussions(@Res() response) {
    try {
      const discussionsData = await this.discussionsService.getDiscussions();
      return response.status(HttpStatus.OK).json({
        message: 'All discussions data found successfully',
        data: discussionsData,
      });
    } catch (err) {
      return response.status(err.status).json({
        errorMessage: err.message,
        errorCode: err.statusCode,
      });
    }
  }

  @Patch('/:discussionId')
  async updateDiscussion(@Res() response, @Param('discussionId') discussionId: number, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    try {
      const existingDiscussion = await this.discussionsService.updateDiscussion(discussionId, updateDiscussionDto);
      return response.status(HttpStatus.OK).json({
        message: 'Discussion has been successfully updated',
        existingDiscussion,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:discussionId')
  async deleteDiscussion(@Res() response, @Param('discussionId') discussionId: number) {
    try {
      const deletedDiscussion = await this.discussionsService.deleteDiscussion(discussionId);
      return response.status(HttpStatus.OK).json({
        message: 'Discussion deleted successfully',
        deletedDiscussion,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':discussionId')
  addDiscussionParticipants(@Param('discussionId') discussionId: number, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionsService.updateDiscussion(+discussionId, updateDiscussionDto);
  }

  @Patch('/:discussionId')
  deleteDiscussionParticipants(@Param('discussionId') discussionId: number, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionsService.updateDiscussion(+discussionId, updateDiscussionDto);
  }

  @Get('/:discussionId')
  async getDiscussionBy(@Res() response, @Param('discussionId') discussionId: number) {
    try {
      const existingDiscussion = await this.discussionsService.getDiscussionBy(discussionId);
      return response.status(HttpStatus.OK).json({
        message: 'Discussion found successfully',
        existingDiscussion,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:owner')
  async getDiscussionByOwner(@Res() response, @Param('owner') owner: number) {
    try {
      const existingDiscussion = await this.discussionsService.getDiscussionByOwner(owner);
      return response.status(HttpStatus.OK).json({
        message: 'Discussion found successfully',
        existingDiscussion,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
