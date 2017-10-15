import { Component, OnInit } from '@angular/core';
// FIREBASE
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
// ROUTER
import { Router, ActivatedRoute } from '@angular/router';
// MODULES
import { Profile } from '../models/profile';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  profile = {} as Profile;
  urlParam: string;
  currentAuth: any;

  constructor(public af: AngularFire, public router: Router) {
    var param = router.parseUrl(router.url).queryParams["profile"];
    this.urlParam = param;
    this.readProfile();
  }

  ngOnInit() {

  }

  readProfile() {
    this.af.database.object(`profile/${this.urlParam}`).subscribe( data => {
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
  createConversation(){
    var user = this.urlParam;
    var from = this.currentAuth;
    var message = {
      data: new Date(),
      name: "MR Z",
      body: "Holaaa",
      like: false
    }
    this.af.database.object(`conversations/${this.urlParam}/${this.currentAuth}`).set(message);
  }

}
