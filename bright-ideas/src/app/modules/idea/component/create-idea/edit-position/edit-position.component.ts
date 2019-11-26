import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostingEndpointService } from 'src/app/services/posting-endpoint/posting-endpoint.service';
import { Subscription } from 'rxjs';
import { Posting } from 'src/app/models/posting';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalNotificationService } from '../../../../../shared/services/modal-notification/modal-notification.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit, OnDestroy{
  editPositionForm: FormGroup;
  editPositionSubscription: Subscription;
  currentPosition: Posting;
  @Input() position: Posting;

  constructor( private positionEndPointService: PostingEndpointService,
               private modalNotificationService: ModalNotificationService,
               private spinnerService: Ng4LoadingSpinnerService,

    ) {
    this.editPositionForm = new FormGroup({
      title_position: new FormControl('', Validators.required),
      description_position: new FormControl('', Validators.required),
      nbr_pos_available: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {
    this.initilizationPositionList();
    
  }

  initilizationPositionList() {
    this.editPositionSubscription = this.positionEndPointService.currentPositionEdited.subscribe((response: Posting) => {
      if (response) {
        this.editPositionForm.controls.title_position.setValue(response.postingName);
        this.editPositionForm.controls.description_position.setValue(response.postingDescription);
        this.editPositionForm.controls.nbr_pos_available.setValue(response.numberAvailable);
      }
    });
  }


  checkIfisNumber(event: any): boolean {
    return this.positionEndPointService.checkNumberValues(event)
  }

  ngOnDestroy() {
    this.editPositionSubscription.unsubscribe();
  }

  editPosition() {
    if (this.position !== undefined) {
      this.position.postingName = this.editPositionForm.get('title_position').value;
      this.position.postingDescription = this.editPositionForm.get('description_position').value;
      this.position.numberAvailable = this.editPositionForm.get('nbr_pos_available').value;
      this.positionEndPointService.updatePosting(this.position).subscribe( (res: any) => {
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
    this.spinnerService.hide();
  }
}
