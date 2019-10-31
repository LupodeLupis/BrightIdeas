import { Media } from './media';
import { Member } from './member';
import { Posting } from './posting';
import { Update } from './update';
import { ToDo } from './todo';

export interface Idea {
    ideaID: number;
    ideaName: string
    ideaDescription: string;
    ideaCreator: Member;
    ideaLeader: Member;
    media: Media;
    posting: Posting;
    update: Update;
    date: Date;     //TypeScript default class type
    toDoList: ToDo;
}