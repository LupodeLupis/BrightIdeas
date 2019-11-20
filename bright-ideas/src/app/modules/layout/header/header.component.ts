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

  constructor(private router: Router) {
    this.isUserLoggedIn = tokenIsValid();
  }

  ngOnInit(){}

  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }

  search(searchText, searchType): void {
    if (searchText != null)
    {
      if(searchType == null || searchType === 'ideas')
      {
        this.router.navigateByUrl('/searchResults/Ideas/' + searchText.value);
      } else
      {
        this.router.navigateByUrl('/searchResults/Profiles/' + searchText.value);
      }
    }
  }
}
