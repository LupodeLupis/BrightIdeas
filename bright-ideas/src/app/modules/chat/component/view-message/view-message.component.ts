<<<<<<< HEAD
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
=======
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
import { Component, OnInit } from "@angular/core";
import { Idea } from "src/app/models/idea";
import { IdeaEndpointService } from "src/app/services/idea-endpoint/idea-endpoint.service";

@Component({
  selector: "app-view-message",
  templateUrl: "./view-message.component.html",
  styleUrls: ["./view-message.component.css"]
})
export class ViewMessageComponent implements OnInit {
<<<<<<< HEAD
>>>>>>> 7a6643f848792b8602dceac746bef5bf5c2f228e
=======
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
  ideas: Idea[] = [];
  getIdeasSub;
  filteredIdeas: Idea[] = [];

<<<<<<< HEAD
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
=======
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
  constructor(private ideaService: IdeaEndpointService) {}

  ngOnInit() {
    this.getIdeasSub = this.ideaService.getIdeas().subscribe(data => {
      this.ideas = data;
      console.log(this.ideas);
    });
  }
<<<<<<< HEAD
>>>>>>> 7a6643f848792b8602dceac746bef5bf5c2f228e
=======
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
}
