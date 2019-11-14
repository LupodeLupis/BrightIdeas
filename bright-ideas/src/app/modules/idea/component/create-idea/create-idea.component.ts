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
   private ideasListSubmission: Subscription;
   @Input() positionsList: Posting [] = [];

  constructor(
    private ideaEndpointService: IdeaEndpointService,
    private postingEndpointService: PostingEndpointService,
    private modalNotificationService: ModalNotificationService
    ) {
      this.ideaForm = new FormGroup({
        idea_title:       new FormControl('', Validators.required),
        idea_description: new FormControl ('', Validators.required),
        idea_category:    new FormControl('', Validators.required)
      });

      this.categoryList = CATEGORIES;
      this.isModalVisible = true;
      this.idea = {
        ideaName: '',
        ideaDescription: '',
        ideaCreator: 1,
        ideaLeader: 1,
        category: '',
        toDoList: 1
      };
     }

  ngOnInit() {
    this.positionsListSub = this.postingEndpointService.showPositionList.subscribe((position) => {
      this.positionsList = position;
    });
  }


  onSubmit() {
    if (this.positionsList) {
      this.idea.ideaName = this.ideaForm.get('idea_title').value;
      this.idea.ideaDescription = this.ideaForm.get('idea_description').value;
      this.idea.category = this.ideaForm.get('idea_category').value;
      this.ideasListSubmission =  this.ideaEndpointService.createIdea(this.idea).subscribe((response: any ) => {
        _.forEach(this.positionsList, (value, index) => {
          this.positionsList[index].ideaID = response.insertId;
        });
        this.modalNotificationService.openModalNotification({
          successMessage: 'The idea has been created succesfully!.'
        });
      },
      (error: HttpErrorResponse) => {
        this.modalNotificationService.openModalNotification({
          messageFailure: 'The idea could not be created.'
        });
      });
      setTimeout(() => {
        this.postingEndpointService.createPosting(this.positionsList).subscribe((response: any) => {
        console.log(response);
      }, (error: HttpErrorResponse) => {
          console.log(error);
        });
      });
    }
  }

  ngOnDestroy() {
    this.positionsListSub.unsubscribe();
   // this.ideasListSubmission.unsubscribe();
  }

  addPosition() {
  this.isModalVisible = true;
  }

  deletePosition(event: ElementRef){
    console.log(event)
  }

}
