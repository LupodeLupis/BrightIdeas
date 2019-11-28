import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostingEndpointService } from '../../../services/posting-endpoint/posting-endpoint.service';
import { ModalNotificationService } from '../../services/modal-notification/modal-notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { IdeaEndpointService } from '../../../services/idea-endpoint/idea-endpoint.service';
import { ProfileEndpointService } from '../../../services/profile-endpoint/profile-endpoint.service';
import { Idea } from 'src/app/models/idea';

@Component({
  selector: 'app-delete-notification',
  templateUrl: './delete-notification.component.html',
  styleUrls: ['./delete-notification.component.css']
})
export class DeleteNotificationComponent implements OnInit {
  @Input() body = {type: '', id: '', name: '' , list: [], listIndex: 0};

  constructor(public activeModal: NgbActiveModal,
              private postingEndpointService: PostingEndpointService,
              private modalNotificationService: ModalNotificationService,
              private sessionStoargeService: SessionStorageService,
              private ideaEndpointService: IdeaEndpointService,
              private profileEndpointService: ProfileEndpointService,

    ) {
   }

  ngOnInit() {
  }

  delete() {
    switch (this.body.type) {
      case 'position':
        this.postingEndpointService.deletePosting(this.body.id).subscribe( (res: any) => {
          this.modalNotificationService.openModalNotification({
            successMessage: 'Position deleted succesfully'
          });
        }, (error: HttpErrorResponse) => {
          this.modalNotificationService.openModalNotification({
            messageFailure: error.message
          });
        });
        this.body.list.splice(this.body.listIndex, 1);
        this.sessionStoargeService.removePositions();
        this.activeModal.dismiss();
        break;
      case 'idea':
        this.ideaEndpointService.deleteIdea(this.body.id).subscribe( (res: any) => {
          this.modalNotificationService.openModalNotification({
            successMessage: 'Position deleted succesfully'
          });
        }, (error: HttpErrorResponse) => {
          this.modalNotificationService.openModalNotification({
            messageFailure: error.message
          });
        });
        this.body.list.splice(this.body.listIndex, 1);
        this.activeModal.dismiss();
        break;
      case 'profile':
        this.profileEndpointService.deleteProfile(this.body.id).subscribe((response: any) => {
          this.modalNotificationService.openModalNotification({
              successMessage: 'Profile deleted successfully'
            });
          }, (error: HttpErrorResponse) => {
            this.modalNotificationService.openModalNotification({
              failureMessage: error.message
            });
          });
        this.activeModal.dismiss();
        break;
      default:
        this.activeModal.dismiss();
      }
    }
}
