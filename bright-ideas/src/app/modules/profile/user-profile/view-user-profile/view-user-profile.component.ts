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
import * as _ from 'lodash';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Profile } from '../../../../models/profile';

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
  profile: Profile;
  listIdea: Idea [] = [];
  isProfileDeleted: boolean;
  constructor(private sessionStorageService: SessionStorageService,
              private profileEndpointService: ProfileEndpointService,
              private ideaEndpointService: IdeaEndpointService,
              private modalNotificationService: ModalNotificationService ,
              private spinnerService: Ng4LoadingSpinnerService,

              ) {
    this.user = sessionStorageService.getUser();
    this.isProfileDeleted = true;
    this.profileForm = new FormGroup({
      // profile_img:   new FormControl('', Validators.required), // not in use at the moment
      profile_name:  new FormControl('', Validators.required),
      profile_about: new FormControl('', Validators.required)
    });
    this.profile = {
      profileID: '',
      profilePicture: '',
      profileDescription: '',
      profileDisplayName: '',
      userID: this.user.userID
    };
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

  initilizationList() {
    if (this.user) {
      this.profileEndpointService.getProfileByUserId(this.user.userID).subscribe((response: any) => {
        if (response.length !== 0) {
          this.profileId = response[0].profileID;
          this.url = response[0].profilePicture;
          this.profileForm.get('profile_name').setValue(response[0].profileDisplayName);
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
      this.modalNotificationService.openModalDeletenNotification({
        type: 'profile',
        id: this.profileId,
      });
    }
    this.profileForm.reset();
    this.listIdea = [];
  }

  deleteIdea(index: number, ideaId: any, ideaTitle: string) {
    if (index > -1 && ideaId !== 0) {
      this.modalNotificationService.openModalDeletenNotification({
        type: 'idea',
        id: ideaId,
        name: ideaTitle,
        list: this.listIdea,
        listIndex: index
      });
    }
  }

  editProfile() {
    if (this.profileId) {
     this.profile.profileID = this.profileId;
     this.profile.profileDisplayName =  this.profileForm.get('profile_name').value;
     this.profile.profileDescription = this.profileForm.get('profile_about').value;
     this.profileEndpointService.updateProfile(this.profile).subscribe( (response: Profile) => {
      this.modalNotificationService.openModalNotification({
        successMessage: 'Profile edited succesfully'
      });
     }, (error: HttpErrorResponse) => {
        this.modalNotificationService.openModalNotification({
          failureMessage: error.message
        });
     });
    }
  }

  showIdea(ideaId){
    console.log(ideaId)
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
