import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: FirebaseListObservable<any>;
  currentAuth: any;
  msgVal: string = '';
  like: boolean;
  conversation: string;
  welcome: string;
  followers: number;

  constructor(public af: AngularFire, public router: Router) {
    this.readCurrentAuth();
  }

  chatSend(theirMessage: string) {
      this.messages.push({ body: theirMessage, date: new Date(), like: false, name: 'Celiz Matias' });
    this.msgVal = '';
  }

  readCurrentAuth() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.currentAuth = auth;
      }
      else {
        this.router.navigate(['/welcome']);
      }
    });
  }
  readMessages() {
    this.messages = this.af.database.list(`profile/${this.currentAuth.uid}/conversations/${this.conversation}`, {
      query: {
        limitToLast: 40
      }
    });
  }
  getConversation(ev){
    this.conversation = ev;
    this.readMessages();
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
