import { Media } from './media';
import { Member } from './member';
import { Posting } from './posting';
import { Update } from './update';
import { ToDo } from './todo';

export interface Idea {
    id: number;
    description: string;
    creator: Member;
    leader: Member;
    media: Media;
    posting: Posting;
    update: Update;
    date: Date;     //TypeScript default class type
    toDoList: ToDo;
    members: Member;
}