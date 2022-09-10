import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';
import { DiscussionsModule } from './discussions/discussions.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://villagetech:Eoq74PCltSnTxzOw@cluster0.pr8wvzu.mongodb.net/?retryWrites=true&w=majority'
    ),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    DocumentsModule,
    MessagesModule,
    ChatsModule,
    DiscussionsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
