import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service'
import { MediaEndpointService } from 'src/app/services/media-endpoint/media-endpoint.service'
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'
import { routerNgProbeToken } from '@angular/router/src/router_module';

const uploadPath = '../../../../assets/uploads/'

class SearchResult
  {
      ideaID: Number;
      ideaImg: String;
      ideaName: String;
      ideaDesc: String;
      ideaCat: String;
      leadID: Number;
      leadName: String;
      leadImg: String;

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

  constructor(private router: Router, private IdeaService: IdeaEndpointService, private MediaService: MediaEndpointService, private ProfileService: ProfileEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ideaQuery = params.get("query");
      this.getIdeasWildcard(this.ideaQuery);
    });
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

          console.log(tempIdeaImg);
          
          var tempRes = new SearchResult(i[x].ideaID, tempIdeaImg, i[x].ideaName, i[x].ideaDescription, i[x].category, i[x].ideaLeader, tempLeadName, tempLeadImg);
          this.searchResults.push(tempRes);
        }
      }
      this.isLoading = false;  
    });
  }

  getImageByIdea(id): Promise<String> {
    //console.log(this.MediaService)
    var imgPath = "";
    return this.MediaService.getMediaByIdeaId(id).toPromise().then(result => {
      if (result[0] != null)
      {
        imgPath = uploadPath + result[0].file;
      }
      //console.log(imgPath);
      return imgPath;
    }).catch(error => {
      return Promise.reject(error)
    }) 
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

  getLeadName(id): Promise<String> {
    var dispName = "";
    return this.ProfileService.getProfileById(id).toPromise().then(result => {
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
