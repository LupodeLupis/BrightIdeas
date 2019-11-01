import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Idea } from 'src/app/models/idea'
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service'

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.css']
})
export class ViewIdeaComponent implements OnInit {

  public ideaId;
  public idea: Idea;

  constructor(private IdeaService: IdeaEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ideaId = params.get("id");
      this.getIdea(this.ideaId);
    });
  }

  getIdea(id): void {
    this.IdeaService.getIdeaById(id).subscribe((i) => {
      this.idea = i[0];
      console.log(this.idea);
    });
  }
}
