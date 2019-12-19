import { Component, OnInit, OnDestroy, Directive } from '@angular/core';
import { CATEGORIES } from '../../../shared/models/global-constants';
import { tokenIsValid } from '../../../../../indexedDB-manager.js';
import { HeaderComponent } from '../header/header.component';
import { IdeaEndpointService } from './../../../services/idea-endpoint/idea-endpoint.service';
import { Idea_Detail } from './../../../models/idea_detail';

@Component({
    providers: [HeaderComponent],
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit,  OnDestroy {
    categoryList: string[] = [];
    navigationSubscription: any;
    isUserLoggedIn: boolean;
    ideas: Idea_Detail[];
    
    constructor(private ideaService: IdeaEndpointService) {
        this.ideaService.getIdeasWithDetail().subscribe((ideaDetailed) => {
            this.ideas = ideaDetailed;
        });
        this.isUserLoggedIn = tokenIsValid();
        this.categoryList = CATEGORIES;
    };

    ngOnInit() { };

    ngOnDestroy() { };
}
