import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'

@Component({
  selector: 'app-profile-search-results',
  templateUrl: './profile-search-results.component.html',
  styleUrls: ['./profile-search-results.component.css']
})
export class ProfileSearchResultsComponent implements OnInit {

  hasResults = false;
  profileQuery;
  public profileResults: Profile[];

  constructor(private ProfileService: ProfileEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.profileQuery = params.get("query");
      this.getProfilesWildcard(this.profileQuery);
    }); 
  }

  getProfilesWildcard(query): void {
    //this.IdeaService.getIdeaByWildcard(query).subscribe()
    this.ProfileService.getProfileByWildcard(query).subscribe((p) => {
      if (p[0] != null)
      {
        this.hasResults = true;
      }
      for (var x = 0; x < p.length; x++)
      {
        console.log(p[x]);
      }    
      this.profileResults = p; 
    });
  }

}
