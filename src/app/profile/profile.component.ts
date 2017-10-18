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
  followers: any;
  followeds: any;
  currentAuth: any;
  constructor(public af: AngularFire, public router: Router) {
    this.readCurrentAuth();
    this.readProfile();
    this.readGenders();
  }

  ngOnInit() {
    this.countFollowers();
    this.countFollowed();
    this.updateProfile();
  }
  countFollowers() {
    this.af.database.list(`followers/${this.currentAuth.uid}`).subscribe(data => {
      this.followers = data;
    });
  }
  countFollowed() {
    this.af.database.list(`followeds/${this.currentAuth.uid}`).subscribe(data => {
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
  readGenders() {
    this.genders = this.af.database.list('genders', {
      query: {
        limitToLast: 3
      }
    });
  }
  readProfile() {
    this.af.database.object(`profile/${this.currentAuth.uid}`).subscribe(data => {
      this.profile = data;
    });
  }
  createProfile() {
    this.af.database.object(`profile/${this.currentAuth.uid}`).set(this.profile);
    this.router.navigate(['/content/chat']);
  }
  pickName() {
    const numberOfUsers = 50;
    const randomIndex = Math.floor(Math.random() * numberOfUsers);

    this.af.database.object(`names/${randomIndex}`).subscribe(data => {
      this.profile.alias = data.name;
    });

  }
  updateProfile() {
    if (!this.profile.alias) {
        this.pickName();
    }
    if (this.currentAuth.facebook) {
      this.profile = {
        name: this.currentAuth.facebook.displayName,
        alias: this.profile.alias,
        photoURL: this.currentAuth.facebook.photoURL,
        birth: this.profile.birth,
        gender: this.profile.gender,
        about: this.profile.about
      };
    }
    else {
      this.profile = {
        name: this.currentAuth.google.displayName,
        alias: this.profile.alias,
        photoURL: this.currentAuth.google.photoURL,
        birth: this.profile.birth,
        gender: this.profile.gender,
        about: this.profile.about
      };
    }
  }
}
