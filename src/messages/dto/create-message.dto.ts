export class CreateMessageDto {
    messageId?: number;
    chatId: number;
    sender: number; // UserId
    message: string;
    messageType?: string;
    documentId?: number;
    active?: boolean;
}
