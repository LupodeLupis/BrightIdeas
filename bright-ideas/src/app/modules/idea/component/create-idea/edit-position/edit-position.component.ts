import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostingEndpointService } from 'src/app/services/posting-endpoint/posting-endpoint.service';
import { Subscription } from 'rxjs';
import { Posting } from 'src/app/models/posting';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit, OnDestroy{
  editPositionForm: FormGroup;
  editPositionSubscription: Subscription;
  currentPosition: Posting;

  constructor( private positionEndPointService: PostingEndpointService,
    ) {
    
    this.editPositionForm = new FormGroup({
      title_position: new FormControl('', Validators.required),
      description_position: new FormControl('', Validators.required),
      nbr_pos_available: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {
    this.initilizationPositionList()
  }

  initilizationPositionList(){
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

  ngOnDestroy(){
    this.editPositionSubscription.unsubscribe();
  }

}
