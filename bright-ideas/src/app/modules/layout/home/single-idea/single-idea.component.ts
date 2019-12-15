import { Component, OnInit, Input } from '@angular/core';
import { Idea_Detail } from '../../../../models/idea_detail';

@Component({
    selector: 'app-single-idea',
    templateUrl: './single-idea.component.html',
    styleUrls: ['./single-idea.component.css']
})
export class SingleIdeaComponent implements OnInit {
    @Input() idea: Idea_Detail;

    constructor() { }

    ngOnInit() { }
}
