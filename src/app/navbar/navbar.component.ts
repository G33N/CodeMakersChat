import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
user: any;
  constructor(public af: AngularFire, public router: Router) {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.user = auth;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(['/welcome']);
  }
}
