import { Component, OnInit, Output } from '@angular/core';
import { Posting } from '../../../../../models/posting';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { PostingEndpointService } from '../../../../../services/posting-endpoint/posting-endpoint.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalNotificationService } from '../../../../../shared/services/modal-notification/modal-notification.service';



@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {
  // @Output() ModalPosition = new Subject<Posting[]>();
  modalId: string;
  position: Posting;
  positionModalForm: FormGroup;
  positionList: Posting [] = [];
  positionListResponse: Posting [] = [];
  counterNmbrPositionsAvailable = 0;
  counterNmbrPositionFilled = 0;
  areFieldsEmpty = true;

  constructor(private positionEndPointService: PostingEndpointService,
              private modalNotificationService: ModalNotificationService) {
    this.positionModalForm = new FormGroup({
      title:        new FormControl('', Validators.required),
      description:  new FormControl('', Validators.required),
      availability: new FormControl('', Validators.required)
    });

    this.position = {
      postingName: '',
      postingDescription: '',
      numberAvailable: this.counterNmbrPositionsAvailable,
      numberFilled: this.counterNmbrPositionFilled,
    };
   }

  ngOnInit() {
   // this.initilizationPositionsList();
  }
  initilizationPositionsList() {
    // filter all position based on the user logged in
    // check before saving if the position name already exist
    this.positionEndPointService.getAllPosting().subscribe((response: Posting[]) => {
      this.positionListResponse = response;
    })
  }


  onSave() {
    if (this.positionModalForm.valid) {
      this.position = {
        postingName: this.positionModalForm.get('title').value,
        postingDescription: this.positionModalForm.get('description').value,
        numberAvailable: this.positionModalForm.get('availability').value,
        numberFilled: this.counterNmbrPositionFilled
      };
    } else {
      this.resetFieldsValues();
    }
    this.positionEndPointService.createPosting(this.position).subscribe((response: Posting ) => {
      this.modalNotificationService.openModalNotification({
        successMessage: 'The position ' + this.position.postingName + ' is added succesfully.'
      });
      this.positionList.push(this.position);
      this.positionEndPointService.showPositionList.next(this.positionList);
    },
    (error: HttpErrorResponse) => {
      this.modalNotificationService.openModalNotification({messageFailure: 'Position could not be added. Try again.'});
    });
  }

  checkNumberValues(event: any): boolean {
    return isNaN(event.value);
  }

  resetFieldsValues(): boolean {
    this.positionModalForm.get('title').setValue(' ');
    this.positionModalForm.get('description').setValue(' ');
    this.positionModalForm.get('availability').setValue(' ');
    return false;
  }
}
