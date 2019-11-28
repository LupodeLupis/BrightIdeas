import { Member } from '../models/member';
import { Media } from '../models/media';
import { Posting } from '../models/posting';
import { Update } from '../models/update';
import { ToDo } from '../models/todo';

export interface Idea {
<<<<<<< HEAD
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
=======
    ideaID: any;
    ideaName: string;
    ideaDescription: string;
    ideaCreator: number;
    ideaLeader: number;
   // date: string;
    category: string;
    toDoList: number;
>>>>>>> 909b57281cbc214809f0fad904217960bfbe2f1c
}
