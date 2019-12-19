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
// import { saveAs } from 'file-saver'
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ModalNotificationService } from '../../../../shared/services/modal-notification/modal-notification.service';
import * as _ from 'lodash';
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DeleteNotificationService } from '../../../../shared/services/modal-notification/delete-notification.service';



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
  imageQueue: any[] = [];
  uploadedImg: any;
  tempMedia: Media;
  keyIdPosting: string [] = [];
  ideaForm: FormGroup;
  private positionsListSub: Subscription;
  positionsList: Posting [] = [];
  positionEdited: object = {};
  @ViewChild('mediaInput') mediaInput: ElementRef;

  constructor(
    private ideaEndpointService: IdeaEndpointService,
    private postingEndpointService: PostingEndpointService,
    private modalNotificationService: ModalNotificationService,
    private sessionStoargeService: SessionStorageService,
    private mediaEndpointService: MediaEndpointService,
    private spinnerService: Ng4LoadingSpinnerService,
    private deleteNotificationService: DeleteNotificationService
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
  }
  onSubmit() {
    if (this.positionsList) {
      let ideaId = '';
      this.idea.ideaName = this.ideaForm.get('idea_title').value;
      this.idea.ideaDescription = this.ideaForm.get('idea_description').value;
      this.idea.category = this.ideaForm.get('idea_category').value;
      this.ideaEndpointService.createIdea(this.idea).subscribe((response: any ) => {
        ideaId = response.insertId;
        this.persistMedia(ideaId);
        _.forEach(this.positionsList, (value, index) => {
          this.positionsList[index].ideaID = ideaId;
          this.postingEndpointService.updatePosting(value).subscribe((res: Posting) => {
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
  }

  addPosition() {
  this.isModalVisible = true;
  }
  
  editPosition(indexPosition: number, positionId: any) {
    _.forEach(this.positionsList, (value, key) => {
      if (this.positionsList[key].postingID === positionId) {
        this.postingEndpointService.currentPositionEdited.next(value);
      }
    });
  }

  deletePosition(indexPosition: any, positionId: any, positionTitle: string) {
    if (indexPosition > -1 && positionId !== 0) {
      this.deleteNotificationService.openModalDeletenNotification({
        type: 'position',
        id: positionId,
        name: positionTitle,
        list: this.positionsList,
        listIndex: indexPosition
      });
    }
  }

  //Jordan Hui's code
  public addFileToQueue(event) {
    console.log(event);
    this.uploadedImg = event as File;
    if (event) {
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedImg);
        reader.onloadend = (events) => {
            this.imageQueue.push(reader.result);
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

  persistMedia(ideaID)
  {
    this.imageQueue.forEach(img => {
      this.tempMedia = {
        mediaID: null,
        file: img,
        mediaFormat: null,
        ideaID: ideaID,
        profileID: null
      };
      this.mediaEndpointService.createMedia(this.tempMedia).subscribe((response: any) => {
        console.log(response);
      });
    });
  }

  removeFromQueue(index)
  {
    this.imageQueue.splice(index, 1);
  }
  //End of Jordan Hui's code
  // NOT WORKING 
  // uploadFile(): void {
  //   const file: File = this.mediaInput.nativeElement.files;
  //   if (file[0] === undefined) {
  //     this.modalNotificationService.openModalNotification({
  //       messageFailure: 'Please select a file'
  //     });
  //   } else {
  //     if (file.size > FILE_SIZE) {
  //       this.modalNotificationService.openModalNotification({
  //         messageFailure: 'The file is over the size limit'
  //       });
  //     } else {
  //       this.media.fileName = file;
  //       this.media.mediaFormat = file[0].type;
  //       this.mediaEndpointService.createMedia(this.media)
  //     }
  //   }
  // }
}
