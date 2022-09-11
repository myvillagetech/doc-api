import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@ApiTags('documents')
@Controller('/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  @Post()
  async UploadDocument(@Res() response, @Body() createDocumentDto: CreateDocumentDto) {
    try {
      const newDocument = await this.documentsService.createDocument(createDocumentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Document has been uploaded successfully',
        newDocument,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Document not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/:userId/:discussionId')
  async getDocumentBy(@Res() response, @Param('userId') userId: number, @Param('discussionId') documentId: number) {
    try {
      const document = await this.documentsService.getDocumentBy(userId, documentId);
      return response.status(HttpStatus.OK).json({
        message: 'Document found successfully',
        data: document,
      });
    } catch (err) {
      return response.status(err.status).json({
        errorMessage: err.message,
        errorCode: err.statusCode,
      });
    }
  }

  @Get('/:path')
  downloadDocument(@Param('path') path: string) {
    return this.documentsService.downloadDocument(path);
  }

  @Delete('/:documentId')
  async deleteDocument(@Res() response, @Param('documentId') documentId: number) {
    try {
      const deletedUser = await this.documentsService.deleteDocument(documentId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

}
