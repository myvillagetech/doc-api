import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chat.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
    name: 'Chat', useFactory: (connection) => {
      const schema = ChatSchema;
      const AutoIncrement = AutoIncrementFactory(connection);
      schema.plugin(AutoIncrement, { inc_field: 'chatId' });
      return schema;
    },
    inject: [getConnectionToken('Database')],
  }])],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService]
})
export class ChatsModule {}
