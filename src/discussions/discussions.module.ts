import { Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { DiscussionSchema } from './schema/discussion.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
    name: 'Discussion', useFactory: (connection) => {
      const schema = DiscussionSchema;
      const AutoIncrement = AutoIncrementFactory(connection);
      schema.plugin(AutoIncrement, { inc_field: 'discussionId' });
      return schema;
    },
    inject: [getConnectionToken('Database')],
  }])],
  controllers: [DiscussionsController],
  providers: [DiscussionsService],
  exports: [DiscussionsService]
})
export class DiscussionsModule {}
