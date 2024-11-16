import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, switchMap, take, tap } from 'rxjs';
import { HttpService } from '../services/http.service';
import { UserState } from '../user/store/user.reducer';
import { selectUser } from '../user/store/user.selectors';
import { clearUser } from './../user/store/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpointUrl = 'auth';

  constructor(private httpService: HttpService, private store: Store) {}

  signup(email: string, password: string): Observable<UserState> {
    return this.httpService.post<
      { email: string; password: string },
      UserState
    >(`${this.endpointUrl}/signup`, { email, password });
  }

  login(email: string, password: string): Observable<UserState> {
    return this.httpService.post<
      { email: string; password: string },
      UserState
    >(`${this.endpointUrl}/login`, { email, password });
  }

  logout(): Observable<void> {
    return this.store.select(selectUser).pipe(
      take(1),
      switchMap((user) => {
        if (user?.accessToken) {
          return this.httpService
            .post<UserState, void>(`${this.endpointUrl}/logout`, user)
            .pipe(
              tap(() => this.store.dispatch(clearUser())),
              catchError((error) => {
                console.error('Logout failed', error);
                return of(void 0);
              })
            );
        } else {
          this.store.dispatch(clearUser());
          return of(void 0);
        }
      })
    );
  }
}
