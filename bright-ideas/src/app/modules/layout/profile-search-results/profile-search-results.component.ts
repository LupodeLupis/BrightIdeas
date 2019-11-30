import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'
import { MediaEndpointService } from 'src/app/services/media-endpoint/media-endpoint.service'

const uploadPath = '../../../../assets/uploads/'

class SearchResult
{
  profileID: Number;
  profileName: String;
  profileDesc: String;
  profileImg: String;

  constructor(profID, profNam, profDes, profImg)
  {
    this.profileID = profID;
    this.profileName = profNam;
    this.profileDesc = profDes;
    this.profileImg = profImg;
  }
}

@Component({
  selector: 'app-profile-search-results',
  templateUrl: './profile-search-results.component.html',
  styleUrls: ['./profile-search-results.component.css']
})
export class ProfileSearchResultsComponent implements OnInit {

  hasResults = false;
  isLoading = true;
  profileQuery;
  searchResults: SearchResult[] = [];

  constructor(private ProfileService: ProfileEndpointService, private MediaService: MediaEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.profileQuery = params.get("query");
      this.getProfilesWildcard(this.profileQuery);
    }); 
  }

  getProfilesWildcard(query): void {
    this.ProfileService.getProfileByWildcard(query).subscribe(async (p) => {
      if (p[0] != null)
      {
        this.hasResults = true;
        for (var x = 0; x < p.length; x++)
        {
          var tempProfImg = await this.getImageByProfile(p[x].profileID);
          console.log(p[x].profileID + " " + tempProfImg)
          var tempRes = new SearchResult(p[x].profileID, p[x].profileDisplayName, p[x].profileDescription, tempProfImg);
          this.searchResults.push(tempRes);
        }
      }
      this.isLoading = false;   
    });
  }

  getImageByProfile(id): Promise<String> {
    var imgPath = "";
    return this.MediaService.getMediaByProfileId(id).toPromise().then(result => {
      if (result[0] != null)
      {
        imgPath = uploadPath + result[0].file;
      }
      return imgPath;
    }).catch(error => {
      return Promise.reject(error)
    }) 
  }
}
