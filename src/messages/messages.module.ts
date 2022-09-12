import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageSchema } from './schema/message.schema';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
    name: 'Message', useFactory: (connection) => {
      const schema = MessageSchema;
      const AutoIncrement = AutoIncrementFactory(connection);
      schema.plugin(AutoIncrement, { inc_field: 'messageId' });
      return schema;
    },
    inject: [getConnectionToken('Database')],
  }])],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService]
})
export class MessagesModule {}
