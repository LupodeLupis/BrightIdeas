
import { User } from './user';

export interface Message {
    timeStamp: string;
    text: string;
    chatMembers: User
}