import { Component, OnInit, Input } from '@angular/core';
import { UpdateEndpointService } from 'src/app/services/update-endpoint/update-endpoint.service';
import { Update } from 'src/app/models/update';

@Component({
  selector: 'app-add-update-modal',
  templateUrl: './add-update-modal.component.html',
  styleUrls: ['./add-update-modal.component.css']
})
export class AddUpdateModalComponent implements OnInit {

  formIsValid = false;
  update: Update;

  @Input() IdeaID: any;

  constructor(private UpdateService: UpdateEndpointService) { 
    this.update = {
      ideaID: 0,
      description: ''
    }
  }

  ngOnInit() {
  }

  submitMessage(updateMsg)
  {
    this.update.ideaID = this.IdeaID;
    this.update.description = updateMsg;

    this.UpdateService.createUpdate(this.update).subscribe((response: any ) => {
        //console.log(response);
    });

    alert("Update posted");

    this.update.ideaID = 0;
    this.update.description = '';

    document.getElementById("messageForm").innerHTML = '';
    this.checkValid;

    window.location.reload(true);
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
