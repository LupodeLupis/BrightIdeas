import { Component, OnInit, OnDestroy } from '@angular/core';
import { CATEGORIES } from '../../../shared/models/global-constants';
import { Router, NavigationEnd } from '@angular/router';
import { tokenIsValid } from '../../../../../indexedDB-manager.js';
import { HeaderComponent } from '../header/header.component';


@Component({
  providers: [HeaderComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements  OnDestroy {
  categoryList: string[] = [];
  navigationSubscription: any;
  isUserLoggedIn: boolean;
  constructor(private router: Router,
              private headerComponent: HeaderComponent) {
    this.isUserLoggedIn = tokenIsValid();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isUserLoggedIn ) {
        console.log('event',event)
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = true;
        this.headerComponent.ngOnInit()
      }
    });
    this.categoryList = CATEGORIES;
  }

  // ngOnInit() {
  // }


  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
