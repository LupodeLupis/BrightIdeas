import { Component, OnInit, EventEmitter, Input, ElementRef, Output, Inject, OnDestroy } from '@angular/core';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { PostingEndpointService } from '../../../../services/posting-endpoint/posting-endpoint.service';
import { MediaEndpointService } from '../../../../services/media-endpoint/media-endpoint.service';
import { IdeaBasicFields, Idea } from '../../../../models/idea';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CATEGORIES } from '../../../../shared/models/global-constants';
import { Posting } from '../../../../models/posting';
import { Media } from '../../../../models/media';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver'

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
   keyIdPosting: string [] = [];
   public imageQueue: File [] =[];
   private positionsListSub: Subscription;
   @Input() positionsList: Posting [] = [];

  constructor(private ideaEndpointService: IdeaEndpointService, private postingEndpointService: PostingEndpointService, private mediaEndpointService: MediaEndpointService) {
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
      console.log(position)
      this.positionsList = position;

    });
  }


  onSubmit(): void {
    console.log("Submitting files");
    for (var i = 0; i < this.imageQueue.length; i++)
    {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open("POST", '../../../../../assets/uploadedImages' + this.imageQueue[i].name, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(this.imageQueue[i]);
      //var tempMedia: Media = {mediaID: null, file: null, mediaFormat: this.imageQueue[i].name.split('.')[1].toLowerCase(), ideaID: 1, profileID: null};
      //console.log(tempMedia);
      //this.mediaEndpointService.createMedia(tempMedia);
    }
  }


  ngOnDestroy() {
    this.positionsListSub.unsubscribe();
  }

  addPosition() {
  this.isModalVisible = true;
  }

  public addFileToQueue(img : any) {
    //console.log(img.name.split('.')[1].toLowerCase());
    this.imageQueue.push(img);
    console.log(this.imageQueue);
  }

}
