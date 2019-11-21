import { Component, OnInit, EventEmitter, Input, ElementRef, Output, Inject, OnDestroy } from '@angular/core';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { PostingEndpointService } from '../../../../services/posting-endpoint/posting-endpoint.service';
import { Idea } from '../../../../models/idea';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CATEGORIES } from '../../../../shared/models/global-constants';
import { Posting } from '../../../../models/posting';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalNotificationService } from '../../../../shared/services/modal-notification/modal-notification.service';
import * as _ from 'lodash';
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit, OnDestroy {
   idea: Idea;
   isModalVisible: boolean;
   categoryList: string[] = [];
   ideaForm: FormGroup;
   keyIdPosting: string [] = [];
   private positionsListSub: Subscription;
  //  private ideasListSubmission: Subscription;
   @Input() positionsList: Posting [] = [];
   positionEdited: object = {};
  

  constructor(
    private ideaEndpointService: IdeaEndpointService,
    private postingEndpointService: PostingEndpointService,
    private modalNotificationService: ModalNotificationService,
    private sessionStoargeService: SessionStorageService,
    ) {
      this.ideaForm = new FormGroup({
        idea_title:       new FormControl('', Validators.required),
        idea_description: new FormControl ('', Validators.required),
        idea_category:    new FormControl('', Validators.required)
      });
      const currentUser = this.sessionStoargeService.getUser();
      this.categoryList = CATEGORIES;
      this.isModalVisible = true;
      this.idea = {
        ideaName: '',
        ideaDescription: '',
        ideaCreator: currentUser.userID,
        ideaLeader: currentUser.userID,
        category: '',
        toDoList: 1
      };
     }

  ngOnInit() {
    this.positionsListSub = this.postingEndpointService.showPositionList.subscribe((position) => {
      this.positionsList = position;
    });
    this.initilizationPositions();
  }

  initilizationPositions() {
    const positionsFromSessionStorage: Posting[] = this.sessionStoargeService.getPositions();
    if (this.positionsList) {
      this.positionsList = positionsFromSessionStorage;
    }
  }

  initilizationFile() {
    const fileField = (<HTMLInputElement>document.getElementById('mediaInput'));
    fileField.onchange = function()
    {
      //alert(fileField.files[0].size);
      if (fileField.files[0].size > 8388608)
      {
        alert("File size limit: 8mb");
        fileField.value = '';
      }
    }
  }


  onSubmit() {
    if (this.positionsList) {
      this.idea.ideaName = this.ideaForm.get('idea_title').value;
      this.idea.ideaDescription = this.ideaForm.get('idea_description').value;
      this.idea.category = this.ideaForm.get('idea_category').value;
      this.ideaEndpointService.createIdea(this.idea).subscribe((response: any ) => {
        // _.forEach(this.positionsList, (value, index) => {
        //   this.positionsList[index].ideaID = response.insertId;
        // });
        this.modalNotificationService.openModalNotification({
          successMessage: 'The idea has been created succesfully!.'
        });
      },
      (error: HttpErrorResponse) => {
        this.modalNotificationService.openModalNotification({
          messageFailure: 'The idea could not be created.'
        });
      });
      // setTimeout(() => {
      //   this.postingEndpointService.createPosting(this.positionsList).subscribe((response: any) => {
      //   console.log(response);
      // }, (error: HttpErrorResponse) => {
      //     console.log(error);
      //   });
      // });
    }
  }

  ngOnDestroy() {
    this.positionsListSub.unsubscribe();
   // this.ideasListSubmission.unsubscribe();
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

  deletePosition(indexPosition: any) {
    if (indexPosition > -1) {
      this.positionsList.splice(indexPosition, 1);
    }
    this.sessionStoargeService.removePositions();
  }

  uploadFile(): void {
    console.log('uploadFile() is called')
    const fileField = (<HTMLInputElement>document.getElementById('mediaInput'));
    const file = fileField.files[0];
    console.log(file);
    // this.uploadedFile.emit(file);
  }

}
