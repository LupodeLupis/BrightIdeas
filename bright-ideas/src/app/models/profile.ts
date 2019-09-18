
import { Idea } from './idea';
export interface Profile {
    id: number;
    picture: string;
    displayName: string;
    projectDescription: string;
    idea: Idea; 
}