import { Profile } from './profile';

export interface User {
    id: number;
    email: string;
    profile: Profile;
    password: string;
    previousPassword: string;
}