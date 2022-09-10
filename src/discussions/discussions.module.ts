import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscussionSchema } from './schema/discussion.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Discussion', schema: DiscussionSchema}])],
  controllers: [DiscussionsController],
  providers: [DiscussionsService],
  exports: [DiscussionsService]
})
export class DiscussionsModule {}
