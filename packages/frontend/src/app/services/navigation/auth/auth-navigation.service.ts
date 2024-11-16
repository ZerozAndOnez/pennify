import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../user/store/user.selectors';
import { APP_AUTHENTIATION_PATHS, APP_ROUTE_PATHS } from '../../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthNavigationService {
  constructor(private store: Store, private router: Router) {
    this.store.select(selectUser).subscribe((userState) => {
      const isOnAuthenticationPage = APP_AUTHENTIATION_PATHS.includes(
        this.router.url
      );
      if (userState?.accessToken) {
        if (isOnAuthenticationPage) {
          this.router.navigate([APP_ROUTE_PATHS.root]);
        }
      } else {
        if (!isOnAuthenticationPage) {
          this.router.navigate([APP_ROUTE_PATHS.login]);
        }
      }
    });
  }
}
