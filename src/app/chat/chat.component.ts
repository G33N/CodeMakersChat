import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
// MODULES
import { Profile } from '../models/profile';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: FirebaseListObservable<any>;
  profile = {} as Profile;
  currentAuth: any;
  msgVal: string = '';
  like: boolean;
  conversation: any;
  welcome: string;
  messageAs: string;
  messageName: string;

  constructor(public af: AngularFire, public router: Router) {
    this.readCurrentAuth();
    if(this.currentAuth){
        this.readProfile();
    }

  }

  chatSend(theirMessage: string) {
    this.setMessageName();
      var message = {
        body: theirMessage,
        date: new Date(),
        like: false,
        name: this.messageName
      }
      this.messages.push(message);
    this.msgVal = '';
  }
  setMessageName(){
    if (this.messageAs == 'followed') {
        this.messageName = this.profile.alias;
    }
    else {
      this.messageName = this.profile.name;
    }
  }
  readProfile() {
    this.af.database.object(`profile/${this.currentAuth.uid}`).subscribe( data => {
      this.profile = data;
    });
  }
  readCurrentAuth() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.currentAuth = auth;
      }
    });
  }
  readFollowerMessages() {
    this.messages = this.af.database.list(`conversations/${this.currentAuth.uid}/${this.conversation.key}`, {
      query: {
        limitToLast: 40
      }
    });
    this.messageAs = 'follower';
  }
  readFollowedMessages() {
    this.messages = this.af.database.list(`conversations/${this.conversation.key}/${this.currentAuth.uid}`, {
      query: {
        limitToLast: 40
      }
    });
    this.messageAs = 'followed';
  }
  getConversation(ev){
    this.conversation = ev;
    if (this.conversation.is == 'follower') {
      this.readFollowerMessages();
    }
    else {
      this.readFollowedMessages();
    }

  }

  @ViewChild('scrollMe') public myScrollContainer: ElementRef;

    ngOnInit() {
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }

}
