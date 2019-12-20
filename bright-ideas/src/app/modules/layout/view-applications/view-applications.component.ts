//Jordan Hui's code
import { Component, OnInit } from '@angular/core';
import { ApplicationEndpointService } from 'src/app/services/application-endpoint/application-endpoint.service'
import { MemberEndpointService } from 'src/app/services/member-endpoint/member-endpoint.service'
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service'
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'
import { PostingEndpointService } from 'src/app/services/posting-endpoint/posting-endpoint.service'
import { Application } from "src/app/models/application"
import { Member } from "src/app/models/member"
import { SessionStorageService } from 'src/app/shared/services/session-storage/session-storage.service'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { response } from 'express';
import { Posting } from 'src/app/models/posting';

class dispApp
{
  appID: Number;
  profileID: String;
  userImg: any;
  userName: String;
  ideaID: Number;
  ideaName: String;
  posName: String;
  appMsg: String;

  constructor(aid, uid, uimg, unam, iid, inam, pnam, msg)
  {
    this.appID = aid;
    this.profileID = uid
    this.userImg = uimg;
    this.userName = unam;
    this.ideaID = iid
    this.ideaName = inam;
    this.posName = pnam;
    this.appMsg = msg;
  }
}

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {

  selfUserID: Number;
  applications: any[] = [];
  dispApps: dispApp[] = [];
  tempMember: Member;

  constructor(private PostingService: PostingEndpointService, private ApplicationService: ApplicationEndpointService, private MemberService: MemberEndpointService, private ProfileService: ProfileEndpointService, private IdeaService: IdeaEndpointService, private SessionService: SessionStorageService, private DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.selfUserID = this.SessionService.getUser().userID;
    this.ApplicationService.getApplicationByIdeaLeader(this.selfUserID).subscribe((response) => {
      this.applications = response;
      this.applications.forEach(async app => {
        var tempIdeaName = await this.getIdeaName(app.ideaID);
        var tempUserID = await this.getProfileByUserId(app.applicant);
        var tempImg = await this.getImageByProfile(app.applicantId);
        var tempName = await this.getUserName(app.applicantId);
        var tempPos = await this.getPostingNameById(app.positionId);
        this.dispApps.push(new dispApp(app.applicationID, tempUserID, tempImg, tempName, app.ideaID, tempIdeaName, tempPos, app.message));
      })
      console.log(this.applications.length);
    });
  }

  acceptApplication(appID, index) {
    var tempPosting: Posting;
    this.ApplicationService.getApplicationById(appID).subscribe((response) => {
      this.tempMember = {
        userID: response[0].applicantId,
        roleID: response[0].positionId,
        ideaID: response[0].ideaID,
        memberLevel: 0
      }
      console.log(this.tempMember);
      this.MemberService.createMember(this.tempMember).subscribe((response) => {
        console.log(response);
      })
      this.PostingService.getPostingById(response[0].positionId).subscribe((posting) => {
        tempPosting = {
          ideaID: posting[0].ideaID,
          postingID: posting[0].postingID,
          postingName: posting[0].postingName,
          postingDescription: posting[0].postingDescription,
          numberAvailable: posting[0].numberAvailable,
          numberFilled: (posting[0].numberFilled + 1)
        }
        console.log(tempPosting);
        this.PostingService.updatePosting(tempPosting).subscribe((res) => {
          console.log(res);
        })
      })
    })

    this.deleteApplication(appID, index);
  }

  deleteApplication(appID, index) {
    //console.log("Delete Application")
    this.ApplicationService.deleteApplication(appID).subscribe((response) => {
      console.log(response);
    })
    this.dispApps.splice(index, 1);
  }

  getSafeBackgroundImageURL(image) {
    const TYPED_ARRAY = new Uint16Array(image.data);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
    }, '');
    return this.DomSanitizer.bypassSecurityTrustStyle("url("+STRING_CHAR+")");
  }

  getIdeaName(id): Promise<String> {
    var name = ""
    return this.IdeaService.getIdeaById(id).toPromise().then(result => {
      if (result[0] != null)
      {
        name = result[0].ideaName;
      }
      return name;
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

  getUserName(id): Promise<String> {
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

  getPostingNameById(id): Promise<String> {
    var name = "";
    return this.PostingService.getPostingById(id).toPromise().then(result => {
      if (result[0] != null)
      {
        name = result[0].postingName;
      }
      return name;
    }).catch(error => {
      return Promise.reject(error)
    })
  }

  getProfileByUserId(id): Promise<Number> {
    var profileId = -1;
    return this.ProfileService.getProfileByUserId(id).toPromise().then(result => {
      if (result[0] != null)
      {
        profileId = result[0].profileID;
      }
      return profileId;
    }).catch(error => {
      return Promise.reject(error)
    })
  }

}
