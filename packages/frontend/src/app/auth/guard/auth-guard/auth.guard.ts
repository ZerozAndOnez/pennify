import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { selectUser } from '../../../user/store/user.selectors';
import { APP_ROUTE_PATHS } from '../../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map((userState) => {
        if (userState.accessToken) {
          return true;
        } else {
          this.router.navigate([APP_ROUTE_PATHS.login]);
          return false;
        }
      })
    );
  }
}
