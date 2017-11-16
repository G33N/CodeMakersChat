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
  followers: any;
  followeds: any;
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
    this.af.database.list(`followers/${this.urlParam}`).subscribe(data => {
      this.followers = data;
    });
  }
  countFollowed() {
    this.af.database.list(`followeds/${this.urlParam}`).subscribe(data => {
      this.followeds = data;
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

    //this.af.database.list(`followers/${user}`).push({[from]: true});
    this.af.database.object(`followers/${user}`).update({[from]: true});
    //this.af.database.list(`followeds/${from}`).push({[user]: true});
    this.af.database.object(`followeds/${from}`).update({[user]: true});
    this.af.database.list(`conversations/${user}/${from}`).push(message);
    this.router.navigate(['/content/chat']);
  }

}
