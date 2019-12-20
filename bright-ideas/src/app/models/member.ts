import { User } from './user';
import { Role } from './role';

export interface Member {
    userID: Number;
    roleID: Number;
    ideaID: Number;
    memberLevel: Number;
}