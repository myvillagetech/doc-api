import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FileDocument } from './schema/document.schema';

@Injectable()
export class DocumentsService {

  constructor(@InjectModel('File') private documentModel: Model<FileDocument>) { }

  async createDocument(createDocumentDto: CreateDocumentDto): Promise<FileDocument> {
    const newDocument = await new this.documentModel(createDocumentDto);
    return newDocument.save();
  }

  async getDocumentBy(userId: number, discussionId: number): Promise<FileDocument> {
    const existingDocument = await this.documentModel.findOne({ userId: userId, discussionId: discussionId }).exec();
    if (!existingDocument) {
      throw new NotFoundException(`user #${userId && discussionId} not found`);
    }
    return existingDocument;
  }

  downloadDocument(path: string) {
    return `This action removes a #${path} document`;
  }

  async deleteDocument(documentId: number): Promise<FileDocument> {
    const deletedUser = await this.documentModel.findByIdAndDelete(documentId);
    if (!deletedUser) {
      throw new NotFoundException(`user #${documentId} not found`);
    }
    return deletedUser;
  }

}
