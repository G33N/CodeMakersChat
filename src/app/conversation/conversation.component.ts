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
    this.readConversationsFolloweds();
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
    this.followers = this.af.database.list(`followers/${this.currentAuth.uid}`);
  }
  readConversationsFolloweds() {
    this.followeds = this.af.database.list(`followeds/${this.currentAuth.uid}`);
  }
  conversationFollower(follower) {
    this.conversation.emit({key: follower.$key, is: 'follower'});
  }
  conversationFollowed(followed) {
    this.conversation.emit({key: followed.$key, is: 'followed'});
  }
}
