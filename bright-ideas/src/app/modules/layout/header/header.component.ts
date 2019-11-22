import { Component, OnInit, OnDestroy } from '@angular/core';
import { tokenIsValid, removeToken } from '../../../../../indexedDB-manager.js';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service.js';
import { User } from 'src/app/models/user.js';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service.js';
import { UserEndpointService } from '../../../services/user-endpoint/user-endpoint.service.js';
import { ModalNotificationService } from '../../../shared/services/modal-notification/modal-notification.service.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean;
  currentToken: string;
  currentUser: User;
  signout = false;
  constructor(private router: Router,
              private sessionStorageService: SessionStorageService,
              private modalNotificationService: ModalNotificationService,
              // private locStorageService: LocalStorageService,
              ) {
                this.isUserLoggedIn = tokenIsValid();
  }

  ngOnInit() {  }


  signOut() {
    this.sessionStorageService.clearAll();
    removeToken();
    this.currentUser = null;
    this.modalNotificationService.openModalNotification({
      successMessage: 'You are succesfully logged out'
    });
    location.reload();
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
