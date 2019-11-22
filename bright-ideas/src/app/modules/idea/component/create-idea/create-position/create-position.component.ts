import { Component, OnInit, Output } from '@angular/core';
import { Posting } from '../../../../../models/posting';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { PostingEndpointService } from '../../../../../services/posting-endpoint/posting-endpoint.service';
import { ModalNotificationService } from '../../../../../shared/services/modal-notification/modal-notification.service';
import { SessionStorageService } from '../../../../../shared/services/session-storage/session-storage.service';



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
              private modalNotificationService: ModalNotificationService,
              private sessionStorageService: SessionStorageService) {
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
        ideaID: null,
        postingID: '',
        postingName: this.positionModalForm.get('title').value,
        postingDescription: this.positionModalForm.get('description').value,
        numberAvailable: this.positionModalForm.get('availability').value,
        numberFilled: this.counterNmbrPositionFilled
      };
      this.positionEndPointService.createPosting(this.position).subscribe((response: any) => {
        this.position.postingID = response.insertId;
        this.positionList.push(this.position);
        this.sessionStorageService.savePositions(this.positionList);
        this.positionEndPointService.showPositionList.next(this.positionList);
      })
      this.modalNotificationService.openModalNotification({
        successMessage: 'The position ' + this.position.postingName + ' is added succesfully.'
      });
      this.positionModalForm.reset();
    } else {
      this.modalNotificationService.openModalNotification({messageFailure: 'Position could not be added. Try again.'});
      this.positionModalForm.reset();
    }
  }

  checkIfisNumber(event: any): boolean {
    return this.positionEndPointService.checkNumberValues(event);
  }
}
