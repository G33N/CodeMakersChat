import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: any;
  loginWith: string;
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.name = auth;
      }
    });
  }

  ngOnInit() {
  }

  loginFacebook() {
    this.loginWith = 'facebook';
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(function(){
      this.ro
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

}
