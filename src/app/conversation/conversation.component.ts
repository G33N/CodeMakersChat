import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
conversations: FirebaseListObservable<any>;
currentAuth: any;
@Output() conversation = new EventEmitter();
  constructor(public af: AngularFire) {
    this.readCurrentAuth();
    this.readConversations();
  }

  ngOnInit() {
  }

  readCurrentAuth() {
    this.af.auth.subscribe(auth => {
      if (auth) {
          this.currentAuth = auth;
      }
    });
  }

  readConversations() {
    this.conversations = this.af.database.list(`profile/${this.currentAuth.uid}/conversations`);
  }

  conversationSelect(conversation){
    this.conversation.emit(conversation.$key);
  }
}
