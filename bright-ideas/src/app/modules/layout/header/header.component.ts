import { Component, OnInit, OnDestroy } from '@angular/core';
import { tokenIsValid } from '../../../../../indexedDB-manager.js';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean;

  constructor() {
    this.isUserLoggedIn = tokenIsValid();
  }

  ngOnInit() {
  }
  
}
