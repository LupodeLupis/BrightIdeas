import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Idea } from 'src/app/models/idea'
import { IdeaEndpointService } from 'src/app/services/idea-endpoint/idea-endpoint.service'
import { MediaEndpointService } from 'src/app/services/media-endpoint/media-endpoint.service'
import { ProfileEndpointService } from 'src/app/services/profile-endpoint/profile-endpoint.service'
import { TodoEndpointService } from 'src/app/services/todo-endpoint/todo-endpoint.service'
import { PostingEndpointService } from 'src/app/services/posting-endpoint/posting-endpoint.service'

const uploadPath = '../../../../assets/uploads/'

class IdeaDisp
  {
      ideaID: Number;
      ideaName: String;
      ideaDesc: String;
      ideaCat: String;
      ideaDate: String;
      ideaImgs: String[];

      leadID: Number;
      leadName: String;
      leadImg: String;

      constructor( ideaID, ideaName, ideaDesc, ideaCat, ideaDate, ideaImgs, leadID, leadName, leadImg)
      {
        this.ideaID = ideaID,
        this.ideaName = ideaName;
        this.ideaDesc = ideaDesc;
        this.ideaCat = ideaCat;
        this.ideaDate = ideaDate;
        this.ideaImgs = ideaImgs;
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
  idea: Idea;
  displayIdea = new IdeaDisp('', '', '', '', '', '', '', '', '');

  constructor(private IdeaService: IdeaEndpointService, private MediaService: MediaEndpointService, private ProfileService: ProfileEndpointService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.ideaId = params.get("id");
      this.getIdea(this.ideaId);
    });
  }

  getIdea(id): void {
    this.IdeaService.getIdeaById(id).subscribe(async (i) => {
      this.idea = i[0];

      var tempIdeaImgs = await this.getImageByIdea(i[0].ideaID);
      var tempLeadImg = await this.getImageByProfile(i[0].ideaLeader);
      var tempLeadName = await this.getLeadName(i[0].ideaLeader);

      this.displayIdea = new IdeaDisp(i[0].ideaID, i[0].ideaName, i[0].ideaDescription, i[0].category, i[0].date, tempIdeaImgs, i[0].ideaLeader, tempLeadName, tempLeadImg);
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
          console.log(result[x].file);
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
}
