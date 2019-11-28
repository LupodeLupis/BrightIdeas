import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Idea } from '../../../../models/idea';
import { CATEGORIES } from '../../../../shared/models/global-constants';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ProfileEndpointService } from '../../../../services/profile-endpoint/profile-endpoint.service';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ModalNotificationService } from '../../../../shared/services/modal-notification/modal-notification.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  ideaSubscription: Subscription;
  ideaId: any;
  constructor( private profileEndPointService: ProfileEndpointService,
               private ideaEndPointService: IdeaEndpointService,
               private spinnerService: Ng4LoadingSpinnerService,
               private modalNotificationService: ModalNotificationService,
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

  ngOnDestroy() {
    this.ideaSubscription.unsubscribe();
  }
}
