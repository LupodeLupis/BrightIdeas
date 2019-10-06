import { Component, OnInit } from '@angular/core';
import { FollowerEndpointService } from '../../../../services/follower-endpoint.service';
import { MediaEndpointService } from '../../../../services/media-endpoint.service';
import { Media } from '../../../../models/media';
import { Message } from '../../../../models/message';
import { MessageEndpointService } from '../../../../services/message-endpoint.service';

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
    ) { }

  ngOnInit() {

    // for testing purpuse - to be deleted after reviewed
    this.retrieveFollowerById();
    this.retrieveAllFollowers();
    this.retrieveMediaById();
    this.retrieveAllMedia();
    this.retrieveMessagebyId();
    this.retrieveAllMessages();

    console.log('ngOnInit() is called');
  }

  retrieveFollowerById() {
    this.followerService.getFollowerbyId('1').subscribe(
      (response: any) => {
        console.log('Follower by id: ', response);
      }
    );
  }
  retrieveAllFollowers() {
    this.followerService.getAllFollowers().subscribe(
      (response: any) => {
        console.log('Followers: ', response);
      }
    );
  }

  retrieveMediaById() {
    this.mediaEndpointService.getMediabyId('1').subscribe(
      (response: Media) => {
        console.log('Media by id: ', response);
      }
    );
  }

  retrieveAllMedia() {
    this.mediaEndpointService.getAllMedia().subscribe(
      (response: Media[]) => {
        console.log('Media: ', response);
      }
    );
  }

  retrieveMessagebyId() {
    this.messageEndpointService.getMessagebyId('1').subscribe(
      (response: Message) => {
        console.log('Message by Id: ', response);
      }
    );
  }

  retrieveAllMessages() {
    this.messageEndpointService.getAllMessages().subscribe(
      (response: Message[]) => {
        console.log('Messages: ', response);
      }
    );
  }
}
