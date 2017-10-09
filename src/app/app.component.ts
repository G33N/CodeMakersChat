import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  name: any;
  loginWith: string;
  msgVal: string = '';

  constructor(public af: AngularFire) {
    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 40
      }
    });

    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
    });
  }

  loginFacebook() {
    this.loginWith = 'facebook';
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    })
  }
  loginGoogle() {
    this.loginWith = 'google';
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  }
  logout() {
    this.af.auth.logout();
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
