//Jordan Hui's code
import { Component, OnInit, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service'
import { MediaEndpointService } from 'src/app/services/media-endpoint/media-endpoint.service'
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'
import { MemberEndpointService } from 'src/app/services/member-endpoint/member-endpoint.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service'


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
  selector: 'app-ideas-from-member',
  templateUrl: './ideas-from-member.component.html',
  styleUrls: ['./ideas-from-member.component.css']
})
export class IdeasFromMemberComponent implements OnInit {

  isLoading = true;
  hasResults = false;
  ideaQuery;
  searchResults: SearchResult[] = [];

  constructor(private MemberService: MemberEndpointService, private sessionStorageService: SessionStorageService, private domSanitizer: DomSanitizer, private router: Router, private IdeaService: IdeaEndpointService, private MediaService: MediaEndpointService, private ProfileService: ProfileEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getIdeasByMember(this.sessionStorageService.getUser().userID)
  }

  getIdeasByMember(userId)
  {
    this.MemberService.getMemberByUserId(userId).subscribe((m) => {
      if (m.legnth != 0)
      {
        this.hasResults = true;
        m.forEach(element => {
          this.IdeaService.getIdeaById(element.ideaID).subscribe(async (i) => {
            var tempIdeaImg = await this.getImageByIdea(i[0].ideaID);
            var tempLeadImg = await this.getImageByProfile(i[0].ideaLeader);
            var tempLeadName = await this.getLeadName(i[0].ideaLeader);

            var tempRes = new SearchResult(i[0].ideaID, tempIdeaImg, i[0].ideaName, i[0].ideaDescription, i[0].category, i[0].ideaLeader, tempLeadName, tempLeadImg);
            this.searchResults.push(tempRes);
          })
        });
        this.isLoading = false;
      }
    })
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
