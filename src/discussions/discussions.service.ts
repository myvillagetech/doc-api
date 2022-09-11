import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { DiscussionDocument } from './schema/discussion.schema';

@Injectable()
export class DiscussionsService {

  constructor(@InjectModel('Discussion') private discussionModel: Model<DiscussionDocument>) { }

  async createDiscussion(createDiscussionDto: CreateDiscussionDto): Promise<DiscussionDocument> {

    createDiscussionDto.status = 'Progress';
    createDiscussionDto.active = true;
    try {
      const newDiscussion = await new this.discussionModel(createDiscussionDto);
      return newDiscussion.save();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getDiscussions(): Promise<DiscussionDocument[]> {
    const discussionsData = await this.discussionModel.find();
    if (!discussionsData || discussionsData.length == 0) {
      throw new NotFoundException('Discussions data not found!');
    }
    return discussionsData;
  }

  async getDiscussionBy(discussionId: number): Promise<DiscussionDocument> {
    const existingDiscussion = await this.discussionModel.findOne({ discussionId: discussionId }).exec();
    if (!existingDiscussion) {
      throw new NotFoundException(`user #${discussionId} not found`);
    }
    return existingDiscussion;
  }

  async getDiscussionByOwner(owner: number): Promise<DiscussionDocument> {
    const existingDiscussion = await this.discussionModel.findOne({ owner: owner }).exec();
    if (!existingDiscussion) {
      throw new NotFoundException(`user #${owner} not found`);
    }
    return existingDiscussion;
  }

  async updateDiscussion(discussionId: number, updateDiscussionDto: UpdateDiscussionDto): Promise<DiscussionDocument> {
    const existingDiscussion = await this.discussionModel.findByIdAndUpdate(
      { discussionId: discussionId },
      updateDiscussionDto,
      { new: true },
    );
    if (!existingDiscussion) {
      throw new NotFoundException(`user #${discussionId} not found`);
    }
    return existingDiscussion;
  }

  async deleteDiscussion(discussionId: number): Promise<DiscussionDocument> {
    const deletedDiscussion = await this.discussionModel.findOneAndDelete({ discussionId: discussionId });
    if (!deletedDiscussion) {
      throw new NotFoundException(`discussion #${discussionId} not found`);
    }
    return deletedDiscussion;
  }

  addDiscussionParticipants(discussionId: number, participants: Array<number>) {
    return `This action updates a #${participants} discussion`;
  }

  deleteDiscussionParticipants(discussionId: number, participants: Array<number>) {
    return `This action updates a #${discussionId} discussion`;
  }

}
