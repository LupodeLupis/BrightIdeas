import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Idea } from '../../../../models/idea';
import { Media } from '../../../../models/media';
import { MediaEndpointService } from '../../../../services/media-endpoint/media-endpoint.service';
import { CATEGORIES, FILE_SIZE } from '../../../../shared/models/global-constants';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ProfileEndpointService } from '../../../../services/profile-endpoint/profile-endpoint.service';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ModalNotificationService } from '../../../../shared/services/modal-notification/modal-notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

class QueueMedia
{
  mediaID: Number;
  mediaFile: any;

  constructor(mid, mf)
  {
    this.mediaID = mid;
    this.mediaFile = mf;
  }
}

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.css']
})
export class EditIdeaComponent implements OnInit , OnDestroy{
  idea: Idea;
  formEditIdea: FormGroup;
  @Input() ideas: Idea [];
  categoryList: string [];

  imageQueue: any[] = [];
  uploadedImg: any;
  tempMedia: Media;
  uploadedQueue: any[] = [];
  deletedQueue: any[] = [];

  ideaSubscription: Subscription;
  ideaId: any;
  constructor( private profileEndPointService: ProfileEndpointService,
               private ideaEndPointService: IdeaEndpointService,
               private mediaEndpointService: MediaEndpointService,
               private spinnerService: Ng4LoadingSpinnerService,
               private modalNotificationService: ModalNotificationService,
               private domSanitizer: DomSanitizer,
               ) {
    this.formEditIdea = new FormGroup({
      idea_category: new FormControl('', Validators.required),
      idea_title: new FormControl('', Validators.required),
      idea_description: new FormControl('', Validators.required)
    });
    this.categoryList = CATEGORIES;
   }

  ngOnInit() {
    this.initializeIdea();
  }

  initializeIdea() {
    this.ideaSubscription =  this.profileEndPointService.currentIdea.subscribe( (response: Idea) => {
      if (response) {
        this.ideaId = response.ideaID;

        this.imageQueue = [];
        this.uploadedQueue = [];
        this.deletedQueue = [];
        this.getUploadedMedia(this.ideaId);

        this.formEditIdea.get('idea_category').setValue(response.category);
        this.formEditIdea.get('idea_title').setValue(response.ideaName);
        this.formEditIdea.get('idea_description').setValue(response.ideaDescription);
      }
    });
  }

  editIdea() {
    if (this.ideas !== undefined) {
      _.forEach(this.ideas, (value, index) => {
          if (value.ideaID === this.ideaId ) {
          this.ideas[index].ideaID = this.ideaId;
          this.ideas[index].category = this.formEditIdea.get('idea_category').value;
          this.ideas[index].ideaName  = this.formEditIdea.get('idea_title').value;
          this.ideas[index].ideaDescription = this.formEditIdea.get('idea_description').value;
          this.persistMedia(this.ideaId);
          this.deleteMedia();
          console.log(this.ideas[index])
          this.ideaEndPointService.updateIdea(this.ideas[index]).subscribe( (res: any) => {
            this.modalNotificationService.openModalNotification({
              successMessage: 'Position updated successfully'
            });
            this.spinnerService.show();
          }, (error: HttpErrorResponse) => {
            this.modalNotificationService.openModalNotification({
              failureMessage: error.message
            });
          });
        }
      });
    }
    this.spinnerService.hide();
  }

  //Jordan Hui's code
  getSafeImageURL(image) {
      // Converts arraybuffer to typed array object
      const TYPED_ARRAY = new Uint16Array(image.data);
      // converts the typed array to string of characters
      // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY); // this way causes (ERROR RangeError: Maximum call stack size exceeded) error
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
      }, '');
      //sanitize the url that is passed as a value to image src attrtibute
      return this.domSanitizer.bypassSecurityTrustUrl(STRING_CHAR);
  };

  public addFileToQueue(event) {
    console.log(event);
    this.uploadedImg = event as File;
    if (event) {
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedImg);
        reader.onloadend = (events) => {
            this.imageQueue.push(new QueueMedia(-1, reader.result));
            this.uploadedQueue.push(new QueueMedia(-1, reader.result));
            //console.log(this.imageQueue);
        };
    } else {
        if (event.target.files[0].size > FILE_SIZE) {
            this.modalNotificationService.openModalNotification({
                messageFailure: 'The file is over the size limit'
            });
        };
    };
  };

  getUploadedMedia(ideaID) {
    this.mediaEndpointService.getMediaByIdeaId(ideaID).subscribe((response: any) => {
      if(response.length != 0)
      {
        for(var i = 0; i < response.length; i++)
        {
          this.imageQueue.push(new QueueMedia(response[i].mediaID, this.getSafeImageURL(response[i].file)));
        }
      }
    }, (error: HttpErrorResponse) => {
        this.modalNotificationService.openModalNotification({
            failureMessage: error.message
        });
    });
  }

  addToDeleteQueue(index, mediaID) {
    for (var i = 0; i < this.uploadedQueue.length; i++)
    {
      if (this.uploadedQueue[i].mediaFile == this.imageQueue[index].mediaFile)
      {
        this.uploadedQueue.splice(i, 1);
      }
    }
    this.imageQueue.splice(index, 1);
    if (mediaID != -1)
    {
      this.deletedQueue.push(mediaID);
    }
  }

  persistMedia(ideaID) {
    this.uploadedQueue.forEach(img => {
      this.tempMedia = {
        mediaID: null,
        file: img.mediaFile,
        mediaFormat: null,
        ideaID: ideaID,
        profileID: null
      };
      this.mediaEndpointService.createMedia(this.tempMedia).subscribe((response: any) => {
        console.log(response);
      });
    });
  }

  deleteMedia() {
    this.deletedQueue.forEach(element => {
      this.mediaEndpointService.deleteMedia(element).subscribe((response: any) => {
        console.log(response);
      });
    });
  }
  //End of Jordan Hui's code

  ngOnDestroy() {
    this.ideaSubscription.unsubscribe();
  }
} 
