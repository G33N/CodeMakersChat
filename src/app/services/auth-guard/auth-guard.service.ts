import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: FirebaseAuth, private router: Router) {}

  canActivate() {
    return this.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState)
      .do(authenticated => {
        if (!authenticated) this.router.navigate(['/welcome']);
        else this.router.navigate(['/content/chat']);
      });
  }
}
