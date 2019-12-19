//Jordan Hui's code
import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service'
import { MediaEndpointService } from 'src/app/services/media-endpoint/media-endpoint.service'
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { routerNgProbeToken } from '@angular/router/src/router_module';

const uploadPath = '../../../../assets/uploads/'

class SearchResult
  {
      ideaID: Number;
      ideaImg: any;
      ideaName: String;
      ideaDesc: String;
      ideaCat: String;
      leadID: Number;
      leadName: String;
      leadImg: any;

      constructor( ideaID, ideaImg, ideaName, ideaDesc, ideaCat, leadID, leadName, leadImg)
      {
        this.ideaID = ideaID,
        this.ideaImg = ideaImg;
        this.ideaName = ideaName;
        this.ideaDesc = ideaDesc;
        this.ideaCat = ideaCat;
        this.leadID = leadID;
        this.leadName = leadName;
        this.leadImg = leadImg;
      }
  }

@Component({
  selector: 'app-idea-search-results',
  templateUrl: './idea-search-results.component.html',
  styleUrls: ['./idea-search-results.component.css']
})
export class IdeaSearchResultsComponent implements OnInit {

  isLoading = true;
  hasResults = false;
  ideaQuery;
  searchResults: SearchResult[] = [];

  constructor(private domSanitizer: DomSanitizer, private router: Router, private IdeaService: IdeaEndpointService, private MediaService: MediaEndpointService, private ProfileService: ProfileEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.searchResults = [];
      this.ideaQuery = params.get("query");
      this.getIdeasWildcard(this.ideaQuery);
    });
  }

  getSafeImageURL(image){
      // Converts arraybuffer to typed array object
      const TYPED_ARRAY = new Uint16Array(image.data);
      // converts the typed array to string of characters
      // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY); // this way causes (ERROR RangeError: Maximum call stack size exceeded) error
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
      }, '');
      //sanitize the url that is passed as a value to image src attrtibute
      return this.domSanitizer.bypassSecurityTrustUrl(STRING_CHAR);
  };

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

  getIdeasWildcard(query) {
    this.IdeaService.getIdeaByWildcard(query).subscribe(async (i) => {
      if (i[0] != null)
      {
        this.hasResults = true;
        for (var x = 0; x < i.length; x++)
        {
          var tempIdeaImg = await this.getImageByIdea(i[x].ideaID);
          var tempLeadImg = await this.getImageByProfile(i[x].ideaLeader);
          var tempLeadName = await this.getLeadName(i[x].ideaLeader);

          //console.log("IDEA IMG " + tempIdeaImg);
          
          var tempRes = new SearchResult(i[x].ideaID, tempIdeaImg, i[x].ideaName, i[x].ideaDescription, i[x].category, i[x].ideaLeader, tempLeadName, tempLeadImg);
          this.searchResults.push(tempRes);
        }
      }
      this.isLoading = false;  
    });
  }

  getImageByIdea(id): Promise<any> {
    //console.log(this.MediaService)
    var img = this.getSafeBackgroundImageURL("");
    console.log(id);
    return this.MediaService.getMediaByIdeaId(id).toPromise().then(result => {
      console.log(result.length);
      if (result[0] != null)
      {
        img = this.getSafeBackgroundImageURL(result[0].file);
      }
      //console.log(imgPath);
      return img;
    }).catch(error => {
      return Promise.reject(error)
    }) 
  }

  getImageByProfile(id): Promise<any> {
    var img = this.getSafeBackgroundImageURL("");
    return this.ProfileService.getProfileByUserId(id).toPromise().then(result => {
      if (result[0] != null)
      {
        img = this.getSafeBackgroundImageURL(result[0].profilePicture)
      }
      return img;
    }).catch(error => {
      return Promise.reject(error)
    }) 
  }

  getLeadName(id): Promise<String> {
    var dispName = "";
    return this.ProfileService.getProfileByUserId(id).toPromise().then(result => {
      if (result[0] != null)
      {
        dispName = result[0].profileDisplayName;
      }
      return dispName;
    }).catch(error => {
      return Promise.reject(error);
    })
  }

  redirect(route): void
  {
    this.router.navigate([])
  }
  
}
