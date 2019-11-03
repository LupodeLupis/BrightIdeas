import { Component, OnInit, EventEmitter, Input, ElementRef, Output } from '@angular/core';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { PostingEndpointService } from '../../../../services/posting-endpoint/posting-endpoint.service';
import { IdeaBasicFields, Idea } from '../../../../models/idea';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit {
   idea: IdeaBasicFields;
   isModalVisible: boolean;
  constructor(
    private ideaEndpointService: IdeaEndpointService,
    private postingEndpointService: PostingEndpointService,
    ) {
      this.isModalVisible = true;
      this.idea = {
        title: '',
        description: '',
        creator: 0,
        leader: 0,
      };
     }

  ngOnInit() {
    
  }

  onSubmit() {
  }

  onCloseModal(event: object) {
      console.log(event)
   }

   addPosition(){
    this.isModalVisible = true;
   }

}
