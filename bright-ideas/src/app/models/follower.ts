import { Idea } from './idea';
import { User } from './user';


export interface Follower {
    idea: Idea;
    follower: User;
}