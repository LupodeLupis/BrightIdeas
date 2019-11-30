
import { Component, OnInit } from '@angular/core';
import { Idea } from 'src/app/models/idea';
import { IdeaEndpointService } from '../../../../services/idea-endpoint/idea-endpoint.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessageEndpointService } from 'src/app/services/message-endpoint/message-endpoint.service';
import { ChatEndpointService } from 'src/app/services/chat/chat-endpoint-service.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  ideas: Idea[] = [];
  getIdeasSub;
  filteredIdeas: Idea[] = [];

  private getMessagesSub: any;
  messages: string[] = [];
  currentMessage: string;

  constructor(
    private ideaService: IdeaEndpointService,
    // private chatService: ChatService,
    private messageService: MessageEndpointService,
    private chatService:  ChatEndpointService
    ) { }

  ngOnInit() {

    this.getIdeasSub = this.ideaService.getIdeas().subscribe(
      (data) => {
        this.ideas = data;
        // console.log(this.ideas);
      }
    );

    this.getMessagesSub = this.messageService.getMessagebyId(1).subscribe((messages) => {
      this.messages.push(messages);
    })

  //   this.getMessagesSub = this.chatService.getMessages.subscribe((data) => {
  //     this.messages.push(data);
  //   });
  // }

  // sendMessage(){
  //   this.chatService.sendMessage(this.currentMessage);
  //   this.currentMessage = "";
  // }

  // nGOnDestroy(){
  //   if (this.getMessagesSub)
  //     this.getMessagesSub.unsubscribe();
  // }

}
