import { Component, OnInit, EventEmitter, Input, ElementRef, Output } from '@angular/core';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { PostingEndpointService } from '../../../../services/posting-endpoint/posting-endpoint.service';
import { IdeaBasicFields, Idea } from '../../../../models/idea';
import { FormGroup } from '@angular/forms';
import { CATEGORIES } from '../../../../shared/models/global-constants';


@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit {
   idea: IdeaBasicFields;
   isModalVisible: boolean;
   categoryList: string[] = [];
  constructor(
    private ideaEndpointService: IdeaEndpointService,
    private postingEndpointService: PostingEndpointService,
    ) {
      this.categoryList = CATEGORIES;
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
   }

   addPosition(){
    this.isModalVisible = true;
   }

}
