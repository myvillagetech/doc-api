export class CreateChatDto {
    title: number;
    participants: Array<number>;
    owner: number; //UserId
}
