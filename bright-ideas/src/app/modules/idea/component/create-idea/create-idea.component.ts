import { Component, OnInit } from '@angular/core';
import { FollowerEndpointService } from '../../../../services/follower-endpoint.service';
import { Follower } from '../../../../models/follower';
import { MediaEndpointService } from '../../../../services/media-endpoint.service';
import { Media } from '../../../../models/media';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit {

  constructor(
    private followerService: FollowerEndpointService,
    private mediaEndpointService: MediaEndpointService
    ) { }

  ngOnInit() {

    // for testing purpuse - to be deleted after reviewed
    this.retrieveFollowerById();
    this.retrieveAllFollowers();
    this.retrieveMediaById();
    this.retrieveAllMedia();

    console.log('ngOnInit() is called');
  }

  retrieveFollowerById() {
    this.followerService.getFollowbyId('1').subscribe(
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


}
