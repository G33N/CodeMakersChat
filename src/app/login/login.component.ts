import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: any;
  loginWith: string;
  constructor(public af: AngularFire, public router: Router) {
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
    }).then(data => {
      this.router.navigate(['/content']);
    })
  }
  loginGoogle() {
    this.loginWith = 'google';
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(data => {
      this.router.navigate(['/content']);
    })
  }

}
