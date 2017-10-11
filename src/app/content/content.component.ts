import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(public af: AngularFire, public router: Router) {

  }

  ngOnInit() {
    
  }

  checkSession(){
    this.af.auth.subscribe(auth => {
      if (!auth) {
        this.router.navigate(['/welcome']);
      }
    });
  }

}
