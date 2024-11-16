import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';

import { setUser } from '../../user/store/user.actions';
import { translate } from '../../utils/intl/translate';
import { AuthService } from '../auth.service';

interface AuthState {
  error: string | null;
  loading: boolean;
}

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {
  constructor(private authService: AuthService, private store: Store) {
    super({ error: null, loading: false });
  }

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly setError = this.updater((state, error: string | null) => ({
    ...state,
    error,
  }));

  readonly clearError = this.updater((state) => ({
    ...state,
    error: null,
  }));

  readonly get$ = this.select((state) => state);

  readonly signup = this.effect<{ email: string; password: string }>(
    (params$) =>
      params$.pipe(
        tap(() => {
          this.setLoading(true);
          this.setError(null);
        }),
        switchMap(({ email, password }) =>
          this.authService.signup(email, password).pipe(
            tap((user) => {
              this.store.dispatch(setUser(user));
            }),
            catchError((error) => {
              this.setError(translate('Signup failed'));
              return of(error);
            }),
            finalize(() => this.setLoading(false))
          )
        )
      )
  );

  readonly login = this.effect<{ email: string; password: string }>((params$) =>
    params$.pipe(
      tap(() => {
        this.setLoading(true);
        this.setError(null);
      }),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          tap((response) => {
            this.store.dispatch(setUser(response));
          }),
          catchError((error) => {
            this.setError(translate('Login failed'));
            return of(error);
          }),
          finalize(() => this.setLoading(false))
        )
      )
    )
  );
}
