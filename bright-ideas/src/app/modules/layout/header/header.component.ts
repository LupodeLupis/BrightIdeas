import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { tokenIsValid, removeToken } from '../../../../../indexedDB-manager.js';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service.js';
import { ModalNotificationService } from '../../../shared/services/modal-notification/modal-notification.service.js';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()user: any;
  isUserLoggedIn: boolean;
  currentToken: string;
  ideaId: string;
  constructor(private router: Router,
              private sessionStorageService: SessionStorageService,
              private modalNotificationService: ModalNotificationService,
              private spinnerService: Ng4LoadingSpinnerService,
              private ideaEndPointService: IdeaEndpointService,

              ) {
  }

  ngOnInit() {
    console.log('this.user from header', this.user)
  }




  signOut() {
    this.sessionStorageService.clearAll();
    removeToken();
    this.user = null;
    this.spinnerService.show();
    this.modalNotificationService.openModalNotification({
      successMessage: 'You are succesfully logged out'
    });
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
