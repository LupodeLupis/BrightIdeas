import { Component, OnInit } from '@angular/core';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { PostingEndpointService } from '../../../../services/posting-endpoint/posting-endpoint.service';
import { IdeaBasicFields } from '../../../../models/idea';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit {
   idea: IdeaBasicFields;

  constructor(
    private ideaEndpointService: IdeaEndpointService,
    private postingEndpointService: PostingEndpointService,
    ) {
      this.idea = {
        name: '',
        description: ''
      };
     }

  ngOnInit() {
  }

  onSubmit(){
    if (this.idea){
      this.ideaEndpointService.createIdea(this.idea);
    }
  }

}
