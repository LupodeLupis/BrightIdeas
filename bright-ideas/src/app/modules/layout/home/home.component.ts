import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from '../../../shared/models/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoryList: string[] = [];

  constructor() {

    this.categoryList = CATEGORIES;
  }

  ngOnInit() {
  }

}
