export class CreateChatDto {
    chatId?:number;
    title: number;
    participants: Array<number>;
    owner: number; //UserId
    discussionId: number;
    active?: boolean;
}
