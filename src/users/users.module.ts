import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
    name: 'User', useFactory: (connection) => {
      const schema = UserSchema;
      const AutoIncrement = AutoIncrementFactory(connection);
      schema.plugin(AutoIncrement, { inc_field: 'userId' });
      return schema;
    },
    inject: [getConnectionToken('Database')],
  }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
