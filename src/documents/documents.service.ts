import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FileDocument } from './schema/document.schema';

@Injectable()
export class DocumentsService {

  constructor(@InjectModel('File') private documentModel: Model<FileDocument>) { }

  async createDocument(createDocumentDto: CreateDocumentDto): Promise<FileDocument> {
    const newDocument = await new this.documentModel(createDocumentDto);
    return newDocument.save();
  }

  async getDocumentBy(userId: number, discussionId: number): Promise<FileDocument> {
    var query = { $and: [{ userId: { $regex: userId, $options: 'i' } }, { discussionId: { $regex: discussionId, $options: 'i' } }] };

    const existingDocument = await this.documentModel.findOne(query).exec();
    if (!existingDocument) {
      throw new NotFoundException(`Document #${userId && discussionId} not found`);
    }
    return existingDocument;
  }

  downloadDocument(path: string) {
    return `This action removes a #${path} document`;
  }

  async deleteDocument(documentId: number): Promise<FileDocument> {
    const deletedDocument = await this.documentModel.findOneAndDelete({ documentId: documentId });
    if (!deletedDocument) {
      throw new NotFoundException(`Document #${documentId} not found`);
    }
    return deletedDocument;
  }

}
