import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service';
import { User } from 'src/app/models/user';
import { ProfileEndpointService } from '../../../../services/profile-endpoint/profile-endpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit {
  
  url: ArrayBuffer | string = '';
  profileForm: FormGroup;
  user: User;
  profileId: any;
  constructor(private sessionStorageService: SessionStorageService,
              private profileEndpointService: ProfileEndpointService,
              private readonly route: ActivatedRoute,
              ) {
    this.profileId = this.route.snapshot.paramMap.get('id');
    this.user = sessionStorageService.getUser();
    this.profileForm = new FormGroup({
      profile_name:  new FormControl('', Validators.required),
      profile_email: new FormControl(this.user.emailAddress, Validators.required),
      profile_about: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    console.log('ngOnInit() is called')
    //this.initilizationProfile();
  }

  initilizationProfile() {
    if (this.user) {
      this.profileEndpointService.getProfileById(+this.profileId).subscribe( (response: any) =>{
        console.log(response)
      }, (error: HttpErrorResponse) => {
        console.log('Error while retrieving profile')
      });
    }
  }

  initializationIdeas(){
    
  }



}
