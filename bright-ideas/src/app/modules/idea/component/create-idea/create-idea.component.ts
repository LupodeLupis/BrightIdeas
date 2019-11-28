import { Component, OnInit, EventEmitter, Input, ElementRef, Output, Inject, OnDestroy, ViewChild } from '@angular/core';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { PostingEndpointService } from '../../../../services/posting-endpoint/posting-endpoint.service';
import { MediaEndpointService } from '../../../../services/media-endpoint/media-endpoint.service';
import { Idea } from '../../../../models/idea';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CATEGORIES, FILE_SIZE } from '../../../../shared/models/global-constants';
import { Posting } from '../../../../models/posting';
import { Media } from '../../../../models/media';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver'
import { HttpErrorResponse } from '@angular/common/http';
import { ModalNotificationService } from '../../../../shared/services/modal-notification/modal-notification.service';
import * as _ from 'lodash';
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit, OnDestroy {
  idea: Idea;
  media: Media;
  isModalVisible: boolean;
  categoryList: string[] = [];
  imageQueue: File[] = [];
  keyIdPosting: string [] = [];
  ideaForm: FormGroup;
  private positionsListSub: Subscription;
  @Input() positionsList: Posting [] = [];
  positionEdited: object = {};
  @ViewChild('mediaInput') mediaInput: ElementRef;

  constructor(
    private ideaEndpointService: IdeaEndpointService,
    private postingEndpointService: PostingEndpointService,
    private modalNotificationService: ModalNotificationService,
    private sessionStoargeService: SessionStorageService,
    private mediaEndpointService: MediaEndpointService,
    private spinnerService: Ng4LoadingSpinnerService,
    
    ) {
      this.ideaForm = new FormGroup({
        idea_title:       new FormControl('', Validators.required),
        idea_description: new FormControl ('', Validators.required),
        idea_category:    new FormControl('', Validators.required),
      });
      const currentUser = this.sessionStoargeService.getUser();
      this.categoryList = CATEGORIES;
      this.isModalVisible = true;
      this.idea = {
        ideaID: 0,
        ideaName: '',
        ideaDescription: '',
        ideaCreator: currentUser.userID,
        ideaLeader: currentUser.userID,
        category: '',
        toDoList: 1,
        media: null,
        posting: null,
        date: null,
        update: null
      };
      this.media = {
        mediaID: 0,
        file: '',
        mediaFormat: '',
        ideaID: 0,
        profileID: 0
      };
  }

  ngOnInit() {
    this.positionsListSub = this.postingEndpointService.showPositionList.subscribe((position) => {
      this.positionsList = position;
    });
    //this.initilizationPositions();
    //this.initilizationIdea()
  }

  initilizationPositions() {
    const positionsFromSessionStorage: Posting[] = this.sessionStoargeService.getPositions();
    // this.positionsList = positionsFromSessionStorage;
    _.forEach(positionsFromSessionStorage, (value, index) => {
      this.postingEndpointService.getPostingById(value.postingID).subscribe((response: Posting) => {
        this.positionsList.push(value);
        console.log(value)
        console.log('position is retrieved');
      }, (error: HttpErrorResponse) => {
        console.log('Error in retrieveing position');
      });
    });
  }

  initilizationIdea() {
    const ideaFromSessionStorage: Posting[] = this.sessionStoargeService.getPositions();
    const ideaId = ideaFromSessionStorage[0].ideaID;
    this.ideaEndpointService.getIdeaById(ideaId).subscribe((response: Idea) => {
      this.ideaForm.get('idea_title').setValue(response[0].ideaName);
      this.ideaForm.get('idea_category').setValue(response[0].category);
      this.ideaForm.get('idea_description').setValue(response[0].ideaDescription);
    }, (error: HttpErrorResponse) => {
      console.log('Error while retrieving idea')
    });
  }

 /* onSubmit(): void {
    console.log("Submitting files");
    for (var i = 0; i < this.imageQueue.length; i++)
    {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", '../../../../../assets/uploadedImages' + this.imageQueue[i].name, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(this.imageQueue[i]);
      //var tempMedia: Media = {mediaID: null, file: null, mediaFormat: this.imageQueue[i].name.split('.')[1].toLowerCase(), ideaID: 1, profileID: null};
      //console.log(tempMedia);
      //this.mediaEndpointService.createMedia(tempMedia);
    }*/
  onSubmit() {
    if (this.positionsList) {
      let ideaId = '';
      this.idea.ideaName = this.ideaForm.get('idea_title').value;
      this.idea.ideaDescription = this.ideaForm.get('idea_description').value;
      this.idea.category = this.ideaForm.get('idea_category').value;
      this.ideaEndpointService.createIdea(this.idea).subscribe((response: any ) => {
        ideaId = response.insertId;
        _.forEach(this.positionsList, (value, index) => {
          this.positionsList[index].ideaID = ideaId;
          this.postingEndpointService.updatePosting(value).subscribe((res: Posting) => {
            console.log('the posting is  updated')
          }, (error: HttpErrorResponse) => {
            console.log('Posting updating error', error)
          });
        });
        this.spinnerService.show();
        this.positionsList = [];
        this.ideaForm.reset();
      },
      (error: HttpErrorResponse) => {
        this.modalNotificationService.openModalNotification({
          messageFailure: 'The idea could not be created.'
        });
        this.positionsList = [];
        this.ideaForm.reset();
      });
    }
    this.spinnerService.hide();
    setTimeout(() => {
      this.modalNotificationService.openModalNotification({
        successMessage: 'The idea has been created succesfully!.'
      });
    }, 2500);
  }

  ngOnDestroy() {
    this.positionsListSub.unsubscribe();
   // this.ideasListSubmission.unsubscribe();
  }

  addPosition() {
  this.isModalVisible = true;
  }

  public addFileToQueue(img : any) {
    //console.log(img.name.split('.')[1].toLowerCase());
    this.imageQueue.push(img);
    console.log(this.imageQueue);
  }
  
  editPosition(indexPosition: number, positionId: any) {
    _.forEach(this.positionsList, (value, key) => {
      if (this.positionsList[key].postingID === positionId) {
        this.postingEndpointService.currentPositionEdited.next(value);
      }
    });
  }

  deletePosition(indexPosition: any) {
    if (indexPosition > -1) {
      this.positionsList.splice(indexPosition, 1);
    }
    this.sessionStoargeService.removePositions();
  }

}
