export class CreateDocumentDto {
    documentId: number;
    name: string;
    document: File;
    uploadedBy: number; // UserId
    accessTo: Array<number>; // UserIds
    discussionId: number;
}
