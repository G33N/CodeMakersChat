import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  items: FirebaseListObservable<any>;
  name: any;
  loginWith = 'google';
  msgVal: string = '';

  constructor(public af: AngularFire, public router: Router) {
    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 40
      }
    });
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
      else {
        this.router.navigate(['/welcome']);
      }
    });
  }

  chatSend(theirMessage: string) {
    if (this.loginWith == 'google')
      this.items.push({ message: theirMessage, name: this.name.google.displayName });
    else
      this.items.push({ message: theirMessage, name: this.name.facebook.displayName });
    this.msgVal = '';
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
