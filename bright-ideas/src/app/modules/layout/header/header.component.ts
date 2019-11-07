import { Component, OnInit, OnDestroy } from '@angular/core';
import { tokenIsValid } from '../../../../../indexedDB-manager.js';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isUserLoggedIn: boolean;
  subscription: Subscription;

  constructor(private router: Router) {
    this.isUserLoggedIn = tokenIsValid();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
