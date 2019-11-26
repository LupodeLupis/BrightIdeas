import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Idea } from '../../../../models/idea';
import { CATEGORIES } from '../../../../shared/models/global-constants';

@Component({
  selector: 'app-edit-idea',
  templateUrl: './edit-idea.component.html',
  styleUrls: ['./edit-idea.component.css']
})
export class EditIdeaComponent implements OnInit {
  idea: Idea;
  formEditIdea: FormGroup;
  categoryList: string [];
  constructor() {
    this.formEditIdea = new FormGroup({
      idea_category: new FormControl('', Validators.required),
      idea_title: new FormControl('', Validators.required),
      idea_description: new FormControl('', Validators.required)
    });
    this.categoryList = CATEGORIES;
   }

  ngOnInit() {
  }

}
