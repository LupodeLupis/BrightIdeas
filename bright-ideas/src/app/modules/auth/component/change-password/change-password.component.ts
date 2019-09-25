import { Component, OnInit } from '@angular/core';
import { getDB } from '../../../../../../db-connection.js'
import * as dataManager from '../../../../services/idea-queries.js';
import * as dataManager2 from '../../../../services/profile-queries.js';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit() {

    // just here for testing
    dataManager().getAllIdeas().then((data)=>{
        console.log(data)
      })

      dataManager().getIdeaById(33).then((data)=>{
        console.log(data)
      })
      

    dataManager2().getAllProfiles().then((data)=>{
        console.log(data)
      })

      dataManager2().getProfileById(2).then((data)=>{
        console.log(data)
      })



  }

}
