import { Component, OnInit, OnDestroy } from '@angular/core';
import { CATEGORIES } from '../../../shared/models/global-constants';
import { Router, NavigationEnd } from '@angular/router';
import { tokenIsValid } from '../../../../../indexedDB-manager.js';
import { HeaderComponent } from '../header/header.component';


import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { response } from 'express';
import { IdeaEndpointService } from './../../../services/idea-endpoint/idea-endpoint.service';
import { Idea } from './../../../models/idea';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
    providers: [HeaderComponent],
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit,  OnDestroy {
    categoryList: string[] = [];
    navigationSubscription: any;
    isUserLoggedIn: boolean;
    ideas: Idea[];
    
    constructor(private router: Router,
                private ideaService: IdeaEndpointService,
                private http: HttpClient,
                private domSanitizer: DomSanitizer) {

        this.ideaService.getIdeas().subscribe((ideas) => {
            this.ideas = ideas;
        });
        this.isUserLoggedIn = tokenIsValid();
        this.categoryList = CATEGORIES;
    };

    ngOnInit() { };

    ngOnDestroy() { };

    onFileSelectedEvent(event) {
        let selectedImage = event.target.files[0] as File;
        if(event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedImage);
            reader.onloadend = (events) => {
                //this.postImage(image);
            };
        }
    }

    getSafeImageURL(image){
        // Converts arraybuffer to typed array object
        const TYPED_ARRAY = new Uint16Array(image.data);
        // converts the typed array to string of characters
        // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY); // this way causes (ERROR RangeError: Maximum call stack size exceeded) error
        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
        }, '');
        //sanitize the url that is passed as a value to image src attrtibute
        return this.domSanitizer.bypassSecurityTrustUrl(STRING_CHAR);
    };
}
