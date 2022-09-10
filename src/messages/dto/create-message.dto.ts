export class CreateMessageDto {
    chatId: number;
    sender: number; // UserId
    message: string;
    messageType: string;
    documentId: number;
}
