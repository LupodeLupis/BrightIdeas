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

    // for testing purpuse - to be deleted after reviewed
    this.retrieveFollowerById();
    this.retrieveAllFollowers();

    this.retrieveMediaById();
    this.retrieveAllMedia();

    this.retrieveMessagebyId();
    this.retrieveAllMessages();
   // this.createMessage();
    this.deleteMessage();

    this.retrieveUpdatebyId();
    this.retrieveAllUpdates();


    console.log('ngOnInit() is called');
  }
  // for testing purpuse - to be deleted after reviewed
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
        console.log('GET MESSAGE BY ID: ', response);
      }
    );
  }
  retrieveAllMessages() {
    this.messageEndpointService.getAllMessages().subscribe(
      (response: Message[]) => {
        console.log('GET ALL MESSAGES: ', response);
      }
    );
  }
  // createMessage() {
  //   this.messageEndpointService.createMessage({
  //     timeStamp: '',
  //     text: 'Alberto! a new message cretaed',
  //     sender: '1'}).subscribe(
  //     (response: Message []) => {
  //       console.log('THE MESSAGE IS CREATED');
  //     }
  //   );
  // }

  deleteMessage() {
    this.messageEndpointService.deleteMessage('105').subscribe(
      (response: Message[]) => {
        console.log('THE MESSAGE HAS BEEN DELETED');
      }
    );
  }
  retrieveUpdatebyId() {
    this.updateEndpointService.getUpdateById('1').subscribe(
      (response: Update) =>{
        console.log('Update by Id: ', response);
      }
    );
  }
  retrieveAllUpdates() {
    this.updateEndpointService.getAllUpdates().subscribe(
      (response: Update[]) => {
        console.log('Updates: ', response);
      }
    );
  }
}
