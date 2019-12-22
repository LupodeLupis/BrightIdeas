import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { removeToken } from '../../../../../indexedDB-manager.js';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service.js';
import { ModalNotificationService } from '../../../shared/services/modal-notification/modal-notification.service.js';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IdeaEndpointService } from '../../../services/idea-endpoint/idea-endpoint.service.js';
import { Observable, of } from 'rxjs';
import { Applicants } from '../../../models/applicants.js';
import { tap, catchError} from 'rxjs/operators';
import { SocketService } from '../../../shared/services/socket/socket.service.js';
import { ApplicantNotificationService } from '../../../services/applicant-notification-endpoint/applicant-notification.service.js';


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
  notification$: Observable<any>;
  notificationWebSocket$: Observable<any>;
  applicants: Applicants;

  constructor(private router: Router,
              private sessionStorageService: SessionStorageService,
              private modalNotificationService: ModalNotificationService,
              private spinnerService: Ng4LoadingSpinnerService,
              private ideaEndPointService: IdeaEndpointService,
              private socketService: SocketService,
              private applicantNotificationService: ApplicantNotificationService

              ) {
                this.applicants = {
                  message: '',
                  list: []
                };
              }

  ngOnInit() { 
    this.initializeNotification();
    this.initializeNotificationWebSocket();
   }



  initializeNotification() {
    this.notification$ = this.applicantNotificationService.getAllNotificationFromApplicant().pipe(
      tap(notificationsResArray => {
        console.log(notificationsResArray)
        this.applicants.list = notificationsResArray;
        this.applicants.count = notificationsResArray.length;
      }),
      catchError(err => of(err))
    );
  }



  initializeNotificationWebSocket() {
    console.log('initializeNotificationWebSocket is called')
    this.notification$ = this.socketService.listenForNotification().pipe(
      tap(message => {
        console.log(message)
        this.applicants.list.unshift(message as never);
        this.applicants.count++;
      }),
      catchError(err => of(err))
    );
  }


  signOut() {
    removeToken();
    this.user = null;
    this.spinnerService.show();
    this.modalNotificationService.openModalNotification({
      successMessage: 'You are succesfully logged out'
    });
    this.router.navigate(['home']);
  }

  //Jordan Hui's code
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
