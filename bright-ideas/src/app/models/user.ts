import { Profile } from './profile';

export interface User {
    id: number;
    email: string;
    profile: Profile;
}