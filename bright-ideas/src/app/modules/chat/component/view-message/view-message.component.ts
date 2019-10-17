<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Idea } from 'src/app/models/idea';
import { IdeaEndpointService } from 'src/app/services/idea-endpoint.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  
=======
import { Component, OnInit } from "@angular/core";
import { Idea } from "src/app/models/idea";
import { IdeaEndpointService } from "src/app/services/idea-endpoint/idea-endpoint.service";

@Component({
  selector: "app-view-message",
  templateUrl: "./view-message.component.html",
  styleUrls: ["./view-message.component.css"]
})
export class ViewMessageComponent implements OnInit {
>>>>>>> 7a6643f848792b8602dceac746bef5bf5c2f228e
  ideas: Idea[] = [];
  getIdeasSub;
  filteredIdeas: Idea[] = [];

<<<<<<< HEAD
  constructor(private ideaService: IdeaEndpointService) { }

  ngOnInit() {

    this.getIdeasSub = this.ideaService.getIdeas().subscribe(
      (data) => {
        this.ideas = data;
        console.log(this.ideas);
      }
    )
  }

=======
  constructor(private ideaService: IdeaEndpointService) {}

  ngOnInit() {
    this.getIdeasSub = this.ideaService.getIdeas().subscribe(data => {
      this.ideas = data;
      console.log(this.ideas);
    });
  }
>>>>>>> 7a6643f848792b8602dceac746bef5bf5c2f228e
}
