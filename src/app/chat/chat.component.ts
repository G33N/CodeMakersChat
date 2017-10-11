import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  loginWith = 'google';
  msgVal: string = '';
  like: boolean;

  constructor(public af: AngularFire, public router: Router) {
    this.readCurrentAuth();
    this.readMessages();
  }

  chatSend(theirMessage: string) {
      this.messages.push({ body: theirMessage, date: new Date(), like: this.like});
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
    this.messages = this.af.database.list(`conversations/${this.currentAuth.uid}/GuIShM2ubBTdvMaoies4cvlKlHx1`, {
      query: {
        limitToLast: 40
      }
    });
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
