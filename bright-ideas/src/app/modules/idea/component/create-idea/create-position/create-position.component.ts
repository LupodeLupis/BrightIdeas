import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Posting } from '../../../../../models/posting';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { PostingEndpointService } from '../../../../../services/posting-endpoint/posting-endpoint.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {
  @Output() openModalPosition = new EventEmitter<string>();
  @Output() saveModalPosition = new EventEmitter<object>();
  @Input() positionsAvailable: Event;
  modalId: string;
  position: Posting;
  positionModalForm: FormGroup;
  

  constructor(private positionEndPointService: PostingEndpointService ) {
    this.positionModalForm = new FormGroup({
      title:        new FormControl('', Validators.required),
      description:  new FormControl('', Validators.required),
      availability: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
    this.initilizationList();
    // console.log(this.positionModalForm);
  }

  initilizationList() {
    if (_.isEmpty(this.position)) {
        this.position = {
          postingID: 0,
          postingName: '',
          postingDescription: '',
          numberAvailble: 0,
          numberFilled: 0
        };
    } else {
    }
  }

  addPosition() {
    this.openModalPosition.emit(this.modalId);
  }

  onSave() {
    if (this.positionModalForm.valid) {
      this.position.postingName = this.positionModalForm.get('title').value;
      this.position.postingDescription = this.positionModalForm.get('description').value;
      this.position.numberAvailble = this.positionModalForm.get('availability').value;
    } else {
      this.positionModalForm.get('title').setValue('');
      this.positionModalForm.get('description').setValue('');
      this.positionModalForm.get('availability').setValue(0);
    }
    // this.saveModalPosition.emit({
    //   title: this.position.postingName,
    //   description: this.position.postingDescription,
    //   pos_available: this.position.numberAvailble
    // });
    this.positionEndPointService.createPosting({
      postingName: this.positionModalForm.get('title').value,
      postingDescription: this.positionModalForm.get('description').value,
      numberAvailable: this.positionModalForm.get('availability').value,
      numberFilled: 0}
    ).subscribe((response: Posting ) => {

      // here goes a success message
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    });
  }

  checkNumberValues(event: any): boolean {
    return isNaN(event.value);
  }
}
