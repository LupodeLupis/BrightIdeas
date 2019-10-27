
import { Idea } from './idea';
export interface Profile {
    profileID: number;
    profilePicture: string;
    profileDisplayName: string;
    profileProjectDescription: string;
    idea: Idea; //Should be array?
}