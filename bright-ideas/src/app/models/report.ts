import { Message } from "./message"
import { User } from "./user"
import { Idea } from "./idea"

export interface Report {
    reportID: Number;
    message: Message;
    flaggedUser: User;
    flaggedIdea: Idea;
}