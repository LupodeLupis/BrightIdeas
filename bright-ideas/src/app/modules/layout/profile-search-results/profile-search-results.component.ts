//Jordan Hui's code
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'
import { MediaEndpointService } from 'src/app/services/media-endpoint/media-endpoint.service'

const uploadPath = '../../../../assets/uploads/'

class SearchResult
{
  profileID: Number;
  profileName: String;
  profileDesc: String;
  profileImg: any;

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

  constructor(private domSanitizer: DomSanitizer, private ProfileService: ProfileEndpointService, private MediaService: MediaEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.searchResults = [];
      this.profileQuery = params.get("query");
      this.getProfilesWildcard(this.profileQuery);
    }); 
  }

  getSafeBackgroundImageURL(image){
    // Converts arraybuffer to typed array object
    const TYPED_ARRAY = new Uint16Array(image.data);
    // converts the typed array to string of characters
    // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY); // this way causes (ERROR RangeError: Maximum call stack size exceeded) error
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
    }, '');
    //sanitize the url that is passed as a value to image src attrtibute
    return this.domSanitizer.bypassSecurityTrustStyle("url("+STRING_CHAR+")");
  }

  getProfilesWildcard(query): void {
    this.ProfileService.getProfileByWildcard(query).subscribe(async (p) => {
      if (p[0] != null)
      {
        this.hasResults = true;
        for (var x = 0; x < p.length; x++)
        {
          var tempProfImg = await this.getImageByProfile(p[x].profileID);
          //console.log(p[x].profileID + " " + tempProfImg)
          var tempRes = new SearchResult(p[x].profileID, p[x].profileDisplayName, p[x].profileDescription, tempProfImg);
          this.searchResults.push(tempRes);
        }
      }
      this.isLoading = false;   
    });
  }

  getImageByProfile(id): Promise<any> {
    var img = this.getSafeBackgroundImageURL("");
    return this.ProfileService.getProfileById(id).toPromise().then(result => {
      if (result.length != 0)
      {
        img = this.getSafeBackgroundImageURL(result[0].profilePicture);
      }
      return img;
    }).catch(error => {
      return Promise.reject(error)
    }) 
  }
}
