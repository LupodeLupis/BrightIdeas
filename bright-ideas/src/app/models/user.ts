import { Profile } from './profile';

export class User {
    userID: number;
    emailAddress: string;
    profile: Profile;
    isVarified: number;
    password: string;
    previousPasswords: string;
}