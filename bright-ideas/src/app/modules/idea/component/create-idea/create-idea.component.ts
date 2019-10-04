import { Component, OnInit } from '@angular/core';
import { FollowerService } from '../../../../services/follower-endpoint.service';
import { Follower } from '../../../../models/follower';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent implements OnInit {

  constructor(
    private followerService: FollowerService
    ) { }

  ngOnInit() {
    this.retrieveFollowerById();
    this.retrieveAllFollowers()
    console.log('ngOnInit() is called')
  }

  retrieveFollowerById() {
    this.followerService.getFollowbyId('1').subscribe(
      (response: string) => {
        console.log(response)
      }
    );
  }
  retrieveAllFollowers(){
    this.followerService.getAllFollowers().subscribe(
      (response: Follower[]) => {
        console.log(response);
      }
    );
  }

}
