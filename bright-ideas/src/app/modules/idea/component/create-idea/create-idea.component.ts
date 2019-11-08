import { Component, OnInit, EventEmitter, Input, ElementRef, Output, Inject, OnDestroy } from '@angular/core';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { PostingEndpointService } from '../../../../services/posting-endpoint/posting-endpoint.service';
import { IdeaBasicFields, Idea } from '../../../../models/idea';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CATEGORIES } from '../../../../shared/models/global-constants';
import { Posting } from '../../../../models/posting';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit, OnDestroy {
   idea: IdeaBasicFields;
   isModalVisible: boolean;
   categoryList: string[] = [];
   ideaForm: FormGroup;
   private positionsListSub: Subscription;
   @Input() positionsList: Posting[] = [];


  constructor(
    private ideaEndpointService: IdeaEndpointService,
    private postingEndpointService: PostingEndpointService,
    ) {
      this.ideaForm = new FormGroup({
        idea_title:       new FormControl('', Validators.required),
        idea_description: new FormControl ('', Validators.required),
      });

      this.categoryList = CATEGORIES;
      this.isModalVisible = true;
      this.idea = {
        title: '',
        description: '',
        creator_id: 0,
        leader_id: 0,
      };
     }

  ngOnInit() {
    this.positionsListSub = this.postingEndpointService.showPositionList.subscribe((position) => {
      this.positionsList = position;
    });
  }


  onSubmit() {
  }
  ngOnDestroy() {
    this.positionsListSub.unsubscribe();
  }

  addPosition() {
  this.isModalVisible = true;
  }

}
