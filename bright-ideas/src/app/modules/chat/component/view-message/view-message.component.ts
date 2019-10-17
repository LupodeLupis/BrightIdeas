import { Component, OnInit } from "@angular/core";
import { Idea } from "src/app/models/idea";
import { IdeaEndpointService } from "src/app/services/idea-endpoint/idea-endpoint.service";

@Component({
  selector: "app-view-message",
  templateUrl: "./view-message.component.html",
  styleUrls: ["./view-message.component.css"]
})
export class ViewMessageComponent implements OnInit {
  ideas: Idea[] = [];
  getIdeasSub;
  filteredIdeas: Idea[] = [];

  constructor(private ideaService: IdeaEndpointService) {}

  ngOnInit() {
    this.getIdeasSub = this.ideaService.getIdeas().subscribe(data => {
      this.ideas = data;
      console.log(this.ideas);
    });
  }
}
