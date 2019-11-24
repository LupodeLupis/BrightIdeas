import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FILE_SIZE } from 'src/app/shared/models/global-constants';
import { ModalNotificationService } from 'src/app/shared/services/modal-notification/modal-notification.service';
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from '../../../models/profile';
import { User } from '../../../models/user';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  selectedImage: File = null;
  url: ArrayBuffer | string = '';
  profile: Profile;
  profileForm: FormGroup;
  user: User;
  isImgUploaded: boolean;
  @ViewChild('image') image: ElementRef;

  constructor( private modalNotificationService: ModalNotificationService,
               private profileEndpointService: ProfileEndpointService,
               private sessionStorageService: SessionStorageService,
               private spinnerService: Ng4LoadingSpinnerService,

                ) {
                this.profileForm = new FormGroup({
                    display_name: new FormControl('', Validators.required),
                    about_me: new FormControl('', Validators.required)
                });
                this.user = sessionStorageService.getUser();
                this.profile = {
                    profilePicture: '',
                    profileDisplayName: '',
                    profileDescription: '',
                    userID: this.user.userID
                };
                this.isImgUploaded = false;
            }

  ngOnInit() {
  }

  initilializeProfile() {

  }

  onFileSelectedEvent(event) {
    this.selectedImage = event.target.files[0] as File;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = (events) => {
        this.url = reader.result ;
      };
    } else {
      if (event.target.files[0].size > FILE_SIZE) {
        this.modalNotificationService.openModalNotification({
          messageFailure: 'The file is over the size limit'
        });
      }
    }
    this.isImgUploaded = true;
  }

  onSubmit() {
    if (this.profileForm.valid && this.isImgUploaded) {
        this.profile.profilePicture = this.selectedImage.name;
        this.profile.profileDisplayName = this.profileForm.get('display_name').value;
        this.profileEndpointService.createProfile(this.profile).subscribe((response: Profile) => {
            this.modalNotificationService.openModalNotification({
                successMessage: 'The profile has been created succesfully'
            });
            this.spinnerService.show();
            // this.image.nativeElement.value = null;
        }, (error: HttpErrorResponse) => {
            this.modalNotificationService.openModalNotification({
                messageFailure: 'Something went wrong..Please try again'
            });
        });
    } else {
        this.modalNotificationService.openModalNotification({
            messageFailure: 'Please upload an image'
        });
    }
    this.profileForm.reset();
    this.image.nativeElement.value = null;
  }
}

