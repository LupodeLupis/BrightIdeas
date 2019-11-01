import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Idea } from 'src/app/models/idea'
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service'

@Component({
  selector: 'app-idea-search-results',
  templateUrl: './idea-search-results.component.html',
  styleUrls: ['./idea-search-results.component.css']
})
export class IdeaSearchResultsComponent implements OnInit {

  hasResults = false;
  ideaQuery;
  public ideaResults: Idea[];

  constructor(private IdeaService: IdeaEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ideaQuery = params.get("query");
      this.getIdeasWildcard(this.ideaQuery);
    }); 
  }

  getIdeasWildcard(query): void {
    //this.IdeaService.getIdeaByWildcard(query).subscribe()
    this.IdeaService.getIdeaByWildcard(query).subscribe((i) => {
      if (i[0] != null)
      {
        this.hasResults = true;
      }
      for (var x = 0; x < i.length; x++)
      {
        console.log(i[x]);
      }    
      this.ideaResults = i; 
    });
  }

}
