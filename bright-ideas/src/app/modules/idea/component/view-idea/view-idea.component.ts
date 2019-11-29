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

class IdeaDisp
{
    ideaID: Number;
    ideaName: String;
    ideaDesc: String;
    ideaCat: String;
    ideaDate: String;
    ideaImgs: String[];
    ideaUpdates: Update[];

    leadID: Number;
    leadName: String;
    leadImg: String;

    constructor( ideaID, ideaName, ideaDesc, ideaCat, ideaDate, ideaImgs, ideaUp, leadID, leadName, leadImg)
    {
      this.ideaID = ideaID,
      this.ideaName = ideaName;
      this.ideaDesc = ideaDesc;
      this.ideaCat = ideaCat;
      this.ideaDate = ideaDate;

      this.ideaImgs = ideaImgs;
      this.ideaUpdates = ideaUp;

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
  displayIdea = new IdeaDisp('', '', '', '', '', '', '', '', '', '');
  listIdea: Idea [] = [];
  isLeader = false;

  dateParseOptions = { year: 'numeric', month: 'long', day: 'numeric' };


  constructor(private sessionStorageService: SessionStorageService, private IdeaService: IdeaEndpointService, private MediaService: MediaEndpointService, private ProfileService: ProfileEndpointService, private UpdateService: UpdateEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.paramMap.subscribe(params => {
          this.ideaId = params.get("ideaId");
          this.getIdea(this.ideaId);
      });
  }

  getIdea(id): void {
    this.IdeaService.getIdeaById(id).subscribe(async (i) => {

      var parsedDate = new Date(Date.parse(i[0].date)).toLocaleDateString('en-US', this.dateParseOptions);
      console.log("DATE: " + parsedDate);

      var tempIdeaImgs = await this.getImageByIdea(i[0].ideaID);
      var tempIdeaUpdates = await this.getUpdatesByIdea(i[0].ideaID);
      console.log("No of updates: " + tempIdeaUpdates.length);

      var tempLeadImg = await this.getImageByProfile(i[0].ideaLeader);
      var tempLeadName = await this.getLeadName(i[0].ideaLeader);

      if (this.sessionStorageService.getUser() != null)
      {
        if(i[0].ideaLeader == this.sessionStorageService.getUser().userID)
        {
          this.isLeader = true;
        }
      }
      
      this.displayIdea = new IdeaDisp(i[0].ideaID, i[0].ideaName, i[0].ideaDescription, i[0].category, parsedDate, tempIdeaImgs, tempIdeaUpdates, i[0].ideaLeader, tempLeadName, tempLeadImg);
    });
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

  getUpdatesByIdea(id): Promise<any> {
    console.log("Getting Updates for ideaid: " + id);
    var updates = [];
    return this.UpdateService.getUpdateByIdea(id).toPromise().then(result => {
      if (result[0] != null)
      {
        for (var x = 0; x < result.length; x++)
        {
          updates.push(new Update(result[x].updateID, new Date(Date.parse(result[x].date)).toLocaleDateString('en-US', this.dateParseOptions), result[x].description, result[x].ideaID));
          console.log(result[x].updateID);
        }
        return updates;
      }
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
