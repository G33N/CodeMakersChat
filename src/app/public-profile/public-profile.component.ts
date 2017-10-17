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
  conversations: FirebaseListObservable<any>;
  constructor(public af: AngularFire, public router: Router) {

    var param = router.parseUrl(router.url).queryParams["profile"];
    this.urlParam = param;
    this.readCurrentAuth();
    this.readProfile();
  }

  ngOnInit() {
    this.countFollowers();
    this.countFollowed();
  }

  readProfile() {
    this.af.database.object(`profile/${this.urlParam}`).subscribe(data => {
      this.profile = data;
    });
  }
  countFollowers() {
    this.af.database.list(`profile/${this.urlParam}/followers`).subscribe(data => {
      this.profile.followers = data.length;
    });
  }
  countFollowed() {
    this.af.database.list(`profile/${this.urlParam}/followed`).subscribe(data => {
      this.profile.followed = data.length;
    });
  }
  readCurrentAuth() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.currentAuth = auth;
      }
    });
  }
  createConversation() {
    var user = this.urlParam;
    var from = this.currentAuth.uid;
    var message = {
        data: new Date(),
        name: "Mandale",
        body: "Que la fuerza te acompañe",
        like: true
      }

    this.af.database.object(`profile/${user}/followers/`).set({[from]: true});
    this.af.database.object(`profile/${from}/followed/`).set({[user]: true});
    this.af.database.list(`conversations/${user}/${from}`).push(message);
    this.router.navigate(['/content/chat']);
  }

}
