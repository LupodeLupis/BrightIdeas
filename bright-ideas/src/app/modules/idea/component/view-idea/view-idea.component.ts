import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Idea } from 'src/app/models/idea'
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service'
import { MediaEndpointService } from 'src/app/services/media-endpoint/media-endpoint.service'
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'
import { TodoEndpointService } from 'src/app/services/todo-endpoint/todo-endpoint.service'
import { PostingEndpointService } from 'src/app/services/posting-endpoint/posting-endpoint.service'
import { MemberEndpointService } from 'src/app/services/member-endpoint/member-endpoint.service'
import { UpdateEndpointService } from 'src/app/services/update-endpoint/update-endpoint.service'
import { SessionStorageService } from '../../../../shared/services/session-storage/session-storage.service'
import * as _ from 'lodash';

const uploadPath = '../../../../assets/uploads/'

class Member
{
  id: Number;
  userId: Number;
  profileId: Number;
  profileName: String;
  profileImg: String;
  ideaId: Number;
  roleId: Number;
  roleTitle: String;

  constructor(id, userId, profileId, profileName, profileImg, ideaId, roleId, roleTitle)
  {
    this.id = id;
    this.userId = userId;
    this.profileId = profileId;
    this.profileName = profileName;
    this.profileImg = profileImg;
    this.ideaId = ideaId;
    this.roleId = roleId;
    this.roleTitle = roleTitle;
  }
}

class Update
{
  id: Number;
  date: Date;
  description: String;
  ideaId: Number;

  constructor(id, date, description, ideaId)
  {
    this.id = id;
    this.date = date;
    this.description = description;
    this.ideaId = ideaId;
  }
}

class Posting
{
  id: Number;
  name: String;
  description: String;
  availiable: Number;
  filled: Number;
  ideaId: Number;
  isOpen: boolean;

  constructor(id, name, desc, avail, fill, idea)
  {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.availiable = avail;
    this.filled = fill;
    this.ideaId = idea;

    if (this.filled >= this.availiable)
    {
      this.isOpen = false
    }
    else
    {
      this.isOpen = true;
    }
  }
}

class IdeaDisp
{
    ideaID: Number;
    ideaName: String;
    ideaDesc: String;
    ideaCat: String;
    ideaDate: String;
    ideaImgs: String[];
    ideaUpdates: Update[];
    ideaPostings: Posting[];
    ideaMembers: Member[];

    leadID: Number;
    leadName: String;
    leadImg: String;

    constructor( ideaID, ideaName, ideaDesc, ideaCat, ideaDate, ideaImgs, ideaUp, ideaPost, ideaMem, leadID, leadName, leadImg)
    {
      this.ideaID = ideaID,
      this.ideaName = ideaName;
      this.ideaDesc = ideaDesc;
      this.ideaCat = ideaCat;
      this.ideaDate = ideaDate;

      this.ideaImgs = ideaImgs;
      this.ideaUpdates = ideaUp;
      this.ideaPostings = ideaPost;
      this.ideaMembers = ideaMem;

      this.leadID = leadID;
      this.leadName = leadName;
      this.leadImg = leadImg;
    }
}

@Component({
  selector: 'app-view-idea',
  templateUrl: './view-idea.component.html',
  styleUrls: ['./view-idea.component.css']
})
export class ViewIdeaComponent implements OnInit {

  ideaId;
  displayIdea = new IdeaDisp('', '', '', '', '', '', '', '', '', '', '', '');
  listIdea: Idea [] = [];

  isLoggedIn = false;
  isLeader = false;
  isMember = false;

  dateParseOptions = { year: 'numeric', month: 'long', day: 'numeric' };


  constructor(private sessionStorageService: SessionStorageService, private IdeaService: IdeaEndpointService, private MediaService: MediaEndpointService, private ProfileService: ProfileEndpointService, private UpdateService: UpdateEndpointService, private PostingService: PostingEndpointService, private MemberService: MemberEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
          this.ideaId = params.get("ideaId");
          this.getIdea(this.ideaId);
      });
  }

  getIdea(id): void {
    this.IdeaService.getIdeaById(id).subscribe(async (i) => {

      var parsedDate = new Date(Date.parse(i[0].date)).toLocaleDateString('en-US', this.dateParseOptions);

      var tempIdeaImgs = await this.getImageByIdea(i[0].ideaID);
      var tempIdeaUpdates = await this.getUpdatesByIdea(i[0].ideaID);
      var tempIdeaPostings = await this.getPostingsByIdea(i[0].ideaID);
      var tempIdeaMembers = await this.getMembersByIdea(i[0].ideaID);

      var tempLeadImg = await this.getImageByProfile(i[0].ideaLeader);
      var tempLeadName = await this.getProfileName(i[0].ideaLeader);

      this.checkUserStatus(i);
      
      this.displayIdea = new IdeaDisp(i[0].ideaID, i[0].ideaName, i[0].ideaDescription, i[0].category, parsedDate, tempIdeaImgs, tempIdeaUpdates, tempIdeaPostings, tempIdeaMembers, i[0].ideaLeader, tempLeadName, tempLeadImg);
    });
  }

  checkUserStatus(i): void {
      if (this.sessionStorageService.getUser() != null)
      {
        this.isLoggedIn = true;
        if(i[0].ideaLeader == this.sessionStorageService.getUser().userID)
        {
          this.isLeader = true;
        }
      }
  }

  addUpdateClicked()
  {
    alert("Adding updates in progress...")
  }

  applyClicked(postingId)
  {
    alert("Application to posting " + postingId + " in progress...");
  }

  getImageByIdea(id): Promise<any> {
    var resPath = [];
    return this.MediaService.getMediaByIdeaId(id).toPromise().then(result => {
      if (result[0] != null)
      {
        for (var x = 0; x < result.length; x++)
        {
          resPath.push(uploadPath + result[x].file);
          //console.log(result[x].file);
        }
      }
      return resPath;
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

  getProfileName(id): Promise<String> {
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

  getUpdatesByIdea(id): Promise<any> {
    var updates = [];
    return this.UpdateService.getUpdateByIdea(id).toPromise().then(result => {
      if (result[0] != null)
      {
        for (var x = 0; x < result.length; x++)
        {
          updates.push(new Update(result[x].updateID, new Date(Date.parse(result[x].date)).toLocaleDateString('en-US', this.dateParseOptions), result[x].description, result[x].ideaID));
        }
        return updates;
      }
    }).catch(error => {
      return Promise.reject(error)
    })
  }

  getPostingsByIdea(id): Promise<any> {
    var postings = [];
    return this.PostingService.getPostingByIdea(id).toPromise().then(result => {
      if (result[0] != null)
      {
        for (var x = 0; x < result.length; x++)
        {
          postings.push(new Posting(result[x].postingID, result[x].postingName, result[x].postingDescription, result[x].numberAvailable, result[x].numberFilled, result[x].ideaID));
        }
        return postings;
      }
    }).catch(error => {
      return Promise.reject(error)
    })
  }

  getMembersByIdea(id): Promise<any> {
    var members = [];
    console.log("Getting members for idea: " + id);
    return this.MemberService.getMemberByIdeaId(id).toPromise().then(async result => {
      if (result[0] != null)
      {
        for (var x = 0; x < result.length; x++)
        {
          console.log(result[x].memberID);
          var tmpProfileId = await this.getProfileByUserId(result[x].userID);
          var tmpProfileName = await this.getProfileName(tmpProfileId);
          var tmpProfileImg = await this.getImageByProfile(tmpProfileId);

          var tmpRoleName = await this.getPostingNameById(result[x].roleID);

          members.push(new Member(result[x].memberID, result[x].userID, tmpProfileId, tmpProfileName, tmpProfileImg, result[x].ideaID, result[x].roleID, tmpRoleName))
        }
        return members;
      }
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

  editIdea(ideaId: any) {
    _.forEach(this.listIdea, (value, index) => {
      if (value.ideaID === ideaId) {
        this.ProfileService.currentIdea.next(value);
      }
    });
  }
}
