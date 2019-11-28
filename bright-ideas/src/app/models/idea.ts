import { Member } from '../models/member';
import { Media } from '../models/media';
import { Posting } from '../models/posting';
import { Update } from '../models/update';
import { ToDo } from '../models/todo';

export interface Idea {
    ideaID: Number;
    ideaName: String;
    ideaDescription: String;
    ideaCreator: Number;
    ideaLeader: Number;
    media: Media;
    posting: Posting;
    update: Update;
    date: Date;     //TypeScript default class type
    toDoList: Number;
    category: String;
}
