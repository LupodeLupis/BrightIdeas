import { Component, OnInit } from '@angular/core';
import { FollowerEndpointService } from '../../../../services/follower-endpoint/follower-endpoint.service';
import { MediaEndpointService } from '../../../../services/media-endpoint/media-endpoint.service';
import { Media } from '../../../../models/media';
import { Message } from '../../../../models/message';
import { MessageEndpointService } from '../../../../services/message-endpoint/message-endpoint.service';
import { UpdateEndpointService } from '../../../../services/update-endpoint/update-endpoint.service';
import { Update } from '../../../../models/update';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit {

  constructor(
    private followerService: FollowerEndpointService,
    private mediaEndpointService: MediaEndpointService,
    private messageEndpointService: MessageEndpointService,
    private updateEndpointService: UpdateEndpointService,
    ) { }

  ngOnInit() {
  }

}
