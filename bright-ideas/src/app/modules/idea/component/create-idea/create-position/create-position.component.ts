import { Component, OnInit, Output } from '@angular/core';
import { Posting } from '../../../../../models/posting';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { PostingEndpointService } from '../../../../../services/posting-endpoint/posting-endpoint.service';
import { ModalNotificationService } from '../../../../../shared/services/modal-notification/modal-notification.service';



@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {
  modalId: string;
  position: Posting;
  positionModalForm: FormGroup;
  positionList: Posting [] = [];
  counterNmbrPositionsAvailable = 0;
  counterNmbrPositionFilled = 0;
  postingIdList: string [] = [];

  constructor(private positionEndPointService: PostingEndpointService,
              private modalNotificationService: ModalNotificationService) {
    this.positionModalForm = new FormGroup({
      title:        new FormControl('', Validators.required),
      description:  new FormControl('', Validators.required),
      availability: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }


  onSave() {
    if (this.positionModalForm.valid) {
      this.position = {
        ideaID: '',
        postingName: this.positionModalForm.get('title').value,
        postingDescription: this.positionModalForm.get('description').value,
        numberAvailable: this.positionModalForm.get('availability').value,
        numberFilled: this.counterNmbrPositionFilled
      };
      this.modalNotificationService.openModalNotification({
        successMessage: 'The position ' + this.position.postingName + ' is added succesfully.'
      });
      this.positionList.push(this.position);
      this.positionEndPointService.showPositionList.next(this.positionList);
      this.positionModalForm.reset();
    } else {
      this.modalNotificationService.openModalNotification({messageFailure: 'Position could not be added. Try again.'});
      this.positionModalForm.reset();
    }
  }

  checkNumberValues(event: any): boolean {
    return isNaN(event.value);
  }
}
