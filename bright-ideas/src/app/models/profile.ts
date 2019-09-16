import { Idea } from './idea';

export class Profile {
    id: number;
    picture: string;
    displayName: string;
    description: string;
    idea: Idea; // changed from ideaProjectDescription
}