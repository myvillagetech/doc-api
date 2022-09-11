import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { FileSchema } from './schema/document.schema';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
    name: 'File', useFactory: (connection) => {
      const schema = FileSchema;
      const AutoIncrement = AutoIncrementFactory(connection);
      schema.plugin(AutoIncrement, { inc_field: 'documentId' });
      return schema;
    },
    inject: [getConnectionToken('Database')],
  }])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService]
})
export class DocumentsModule {}
