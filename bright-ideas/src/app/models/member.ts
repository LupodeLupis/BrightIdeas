import { User } from './user';
import { Role } from './role';

export interface Member {
    memberID: Number;
    user: User;
    roleSet: Role;
    memberLevel: String;
}