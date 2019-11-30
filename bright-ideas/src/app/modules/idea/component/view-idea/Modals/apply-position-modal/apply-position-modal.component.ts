import { Component, OnInit } from '@angular/core';
import { ApplicationEndpointService } from 'src/app/services/application-endpoint/application-endpoint.service'
import { ApplyPositionModalService }  from '../apply-position-service/apply-position-modal.service'
import { Application } from 'src/app/models/application';

@Component({
  selector: 'app-apply-position-modal',
  templateUrl: './apply-position-modal.component.html',
  styleUrls: ['./apply-position-modal.component.css']
})
export class ApplyPositionModalComponent implements OnInit {

  application: Application;

  ideaLeader: Number;
  idea: Number;
  applicant: Number;
  position: Number;
  message: String;

  positionName: String;
  leaderName: String;
  leaderImg: String;

  constructor(private ApplicationService: ApplicationEndpointService, private ApplyPositionModalService: ApplyPositionModalService) 
  {
    this.application = {
      applicationId: 0,
      ideaLeaderId: 0,
      ideaId: 0,
      applicantId: 0,
      positionId: 0,
      message: ''
    }
  }

  ngOnInit() {

  }

  openModal(leadId, ideaId, applicantId, positionId, posName, leadName, leadImg)
  {
    this.ideaLeader = leadId;
    this.idea = ideaId;
    this.applicant = applicantId;
    this.position = positionId;

    this.positionName = posName;
    this.leaderName = leadName;
    this.leaderImg = leadImg;

    this.ApplyPositionModalService.open('Apply-Position-Modal');
  }

  close()
  {
    this.ApplyPositionModalService.close('Apply-Position-Modal');
  }

  submit(message)
  {
    this.message = message;

  }

  createApplication(app)
  {
    this.ApplicationService.createApplication(app).subscribe((response: any) => {
      
    })
  }
}
