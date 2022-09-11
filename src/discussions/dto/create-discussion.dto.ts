export class CreateDiscussionDto {
    title: string;
    participants: Array<number>; // userIds
    owner: number; // userId
    status?: string;
    active?: boolean;
}
