import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service';
import { User } from '../../../../models/user';
import { ProfileEndpointService } from '../../../../services/profile-endpoint/profile-endpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Idea } from '../../../../models/idea';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { ModalNotificationService } from '../../../../shared/services/modal-notification/modal-notification.service';
import { FILE_SIZE } from 'src/app/shared/models/global-constants';
import * as _ from 'lodash';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit {
  selectedImage: File = null;
  url: ArrayBuffer | string = '';
  profileForm: FormGroup;
  user: User;
  profileId: any;
  listIdea: Idea [] = [];
  isProfileDeleted: boolean;
  constructor(private sessionStorageService: SessionStorageService,
              private profileEndpointService: ProfileEndpointService,
              private ideaEndpointService: IdeaEndpointService,
              private modalNotificationService: ModalNotificationService ,
              ) {
    this.user = sessionStorageService.getUser();
    this.isProfileDeleted = true;
    this.profileForm = new FormGroup({
      // profile_img:   new FormControl('', Validators.required),
      profile_name:  new FormControl('', Validators.required),
      profile_email: new FormControl('', Validators.required),
      profile_about: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.initilizationList();
  }

  editIdea(ideaId: any) {
    _.forEach(this.listIdea, (value, index) => {
      if (value.ideaID === ideaId) {
        this.profileEndpointService.currentIdea.next(value);
      }
    });
  }

  deleteIdea(index: number, ideaId: any) {

  }

  initilizationList() {
    if (this.user) {
      this.profileEndpointService.getProfileByUserId(this.user.userID).subscribe((response: any) => {
        if (response.length !== 0) {
          this.profileId = response[0].profileID;
          this.url = response[0].profilePicture;
          this.profileForm.get('profile_name').setValue(response[0].profileDisplayName);
          this.profileForm.get('profile_email').setValue(this.user.emailAddress);
          this.profileForm.get('profile_about').setValue(response[0].profileDescription);
          this.ideaEndpointService.getIdeaByUserId(this.user.userID).subscribe((res: any) => {
            this.listIdea = res;
          }, (error: HttpErrorResponse) => {
            this.modalNotificationService.openModalNotification({
              failureMessage: error.message
            });
          });
        }
      }, (error: HttpErrorResponse) => {
        this.modalNotificationService.openModalNotification({
          failureMessage: error.message
        });
      });
    }
  }

  deleteProfile() {
    if (this.profileId) {
      this.profileEndpointService.deleteProfile(this.profileId).subscribe((response: any) => {
        this.modalNotificationService.openModalNotification({
          successMessage: 'Profile deleted successfully'
        });
      }, (error: HttpErrorResponse) => {
        this.modalNotificationService.openModalNotification({
          failureMessage: error.message
        });
      });
    }
    this.profileForm.reset();
    this.listIdea = [];
  }

  editProfile() {

  }


  // onFileChangeSelectedEvent(event) {
  //   this.selectedImage = event.target.files[0] as File;
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(this.selectedImage);
  //     reader.onload = (events) => {
  //       this.url = reader.result ;
  //     };
  //   } else {
  //     if (event.target.files[0].size > FILE_SIZE) {
  //       this.modalNotificationService.openModalNotification({
  //         messageFailure: 'The file is over the size limit'
  //       });
  //     }
  //   }
  // }
}
