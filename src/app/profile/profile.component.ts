import { Component, OnInit } from '@angular/core';
// FIREBASE
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
// ROUTER
import { Router, ActivatedRoute } from '@angular/router';
// MODULES
import { Profile } from '../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
loginWith: string;
genders: FirebaseListObservable<any>;
profile = {} as Profile;
currentAuth: any;
  constructor(public af: AngularFire, public router: Router) {
    this.readCurrentAuth();
    this.readProfile();
    this.readGenders();
  }

  ngOnInit() {
    this.countFollowers();
    this.updateProfile();
  }
  countFollowers() {
    this.af.database.list(`conversations/${this.currentAuth.uid}`).subscribe(data => {
      this.profile.followers = data.length;
    });
  }
  readCurrentAuth() {
    this.af.auth.subscribe(auth => {
      if (auth) {
          this.currentAuth = auth;
      }
    });
  }
  readGenders(){
    this.genders = this.af.database.list('genders', {
      query: {
        limitToLast: 3
      }
    });
  }
  readProfile() {
    this.af.database.object(`profile/${this.currentAuth.uid}`).subscribe( data => {
      this.profile = data;
    });
  }
  createProfile() {
    this.af.auth.subscribe(auth => {
      this.af.database.object(`profile/${auth.uid}`).set(this.profile);
    });
    this.router.navigate(['/content/chat']);
  }
  updateProfile() {
    if (this.currentAuth.facebook) {
      this.profile = {
        name: this.currentAuth.facebook.displayName,
        photoURL: this.currentAuth.facebook.photoURL,
        birth:  this.profile.birth,
        gender: this.profile.gender,
        about: this.profile.about,
        followers: this.profile.followers
      };
    }
    else {
      this.profile = {
        name: this.currentAuth.google.displayName,
        photoURL: this.currentAuth.google.photoURL,
        birth:  this.profile.birth,
        gender: this.profile.gender,
        about: this.profile.about,
        followers: this.profile.followers
      };
    }
  }
}
