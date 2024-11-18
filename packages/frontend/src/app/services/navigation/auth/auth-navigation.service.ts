import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../user/store/user.selectors';
import { APP_AUTHENTIATION_PATHS, APP_ROUTE_PATHS } from '../../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthNavigationService {
  currentUrl = '/';

  constructor(private store: Store, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.store.select(selectUser).subscribe((userState) => {
          const baseUrlWithoutParams = this.currentUrl
            .split('?')[0]
            .split('#')[0];
          const isOnAuthenticationPage =
            APP_AUTHENTIATION_PATHS.includes(baseUrlWithoutParams);
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
    });
  }
}
