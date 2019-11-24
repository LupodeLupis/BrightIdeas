import { Media } from './media';
import { Member } from './member';
import { Posting } from './posting';
import { Update } from './update';
import { ToDo } from './todo';

export interface Idea {
    ideaID: any;
    ideaName: string;
    ideaDescription: string;
    ideaCreator: Member;
    ideaLeader: Member;
    media: Media;
    posting: Posting;
    update: Update;
    date: Date;     //TypeScript default class type
    toDoList: ToDo;
    category: String;
}

export interface IdeaBasicFields {
    title: string;
    description: string;
    creator_id: number;
    leader_id: number;

}