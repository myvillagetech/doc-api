export class CreateDocumentDto {
    documentId: number;
    chatId: number;
    name: string;
    document: File;
    uploadedBy: number; // UserId
    accessTo: Array<number>; // UserIds
}
