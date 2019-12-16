import { Component, OnInit, Input} from '@angular/core';
import { ApplicationEndpointService } from 'src/app/services/application-endpoint/application-endpoint.service'
import { ApplyPositionModalService }  from '../apply-position-service/apply-position-modal.service'
import { Application } from 'src/app/models/application';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-position-modal',
  templateUrl: './apply-position-modal.component.html',
  styleUrls: ['./apply-position-modal.component.css']
})
export class ApplyPositionModalComponent implements OnInit {

  formIsValid = false;
  application: Application;

  @Input() posInfo: any;

  constructor(private ApplicationService: ApplicationEndpointService, private ApplyPositionModalService: ApplyPositionModalService) 
  {
    this.application = {
      applicationId: 0,
      ideaLeaderId: 0,
      ideaID: 0,
      applicantId: 0,
      positionId: 0,
      message: ''
    }
  }

  ngOnInit() {

  }

  openModal()
  {
 
  }

  submitMessage(applyMsg)
  {
    this.application.ideaID = this.posInfo.ideaID;
    this.application.applicantId = this.posInfo.appID;
    this.application.positionId = this.posInfo.posID;
    this.application.ideaLeaderId = this.posInfo.leadID;
    this.application.message = applyMsg;

    this.ApplicationService.createApplication(this.application).subscribe((response: any ) => {
        //console.log(response);
    });

    alert("Application sent");

    this.application = {
      applicationId: 0,
      ideaLeaderId: 0,
      ideaID: 0,
      applicantId: 0,
      positionId: 0,
      message: ''
    }

    document.getElementById("messageForm").innerHTML = '';
    this.checkValid;
  }

  checkValid(applyMsg)
  {
    if (applyMsg != '')
    {
      this.formIsValid = true;
    }
    else
    {
      this.formIsValid = false;
    }
  }
}
