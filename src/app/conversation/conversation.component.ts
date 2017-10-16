import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  followers: FirebaseListObservable<any>;
  followeds: FirebaseListObservable<any>;
  currentAuth: any;
  @Output() conversation = new EventEmitter();
  constructor(public af: AngularFire) {
    this.readCurrentAuth();
    this.readConversationsFollowers();
    this.readConversationsFollowed();
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
  readConversationsFollowers() {
    this.followers = this.af.database.list(`profile/${this.currentAuth.uid}/followers`);
  }
  readConversationsFollowed() {
    this.followeds = this.af.database.list(`profile/${this.currentAuth.uid}/followed`);
  }
  conversationFollower(follower) {
    this.conversation.emit({key: follower.$key, is: 'follower'});
  }
  conversationFollowed(followed) {
    this.conversation.emit({key: followed.$key, is: 'followed'});
  }
}
