import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { setUser } from '../../user/store/user.actions';
import { AuthService } from '../auth.service';

interface AuthState {
  error: string | null;
}

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {
  constructor(private authService: AuthService, private store: Store) {
    super({ error: null });
  }

  readonly setError = this.updater((state, error: string | null) => ({
    ...state,
    error,
  }));

  readonly error$ = this.select((state) => state.error);

  readonly signup = this.effect<{ email: string; password: string }>(
    (params$) =>
      params$.pipe(
        switchMap(({ email, password }) =>
          this.authService.signup(email, password).pipe(
            tap((user) => {
              this.store.dispatch(setUser(user));
            }),
            catchError((error) => {
              this.setError('Signup failed');
              return of(error);
            })
          )
        )
      )
  );

  readonly login = this.effect<{ email: string; password: string }>((params$) =>
    params$.pipe(
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          tap((response) => {
            this.store.dispatch(setUser(response));
          }),
          catchError((error) => {
            this.setError('Login failed');
            return of(error);
          })
        )
      )
    )
  );
}
