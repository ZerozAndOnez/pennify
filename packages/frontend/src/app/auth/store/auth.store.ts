import { inject, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { firstValueFrom, interval, of, Subscription, timer } from 'rxjs';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';
import { SessionExtendDialogComponent } from '../../common/components/dialogs/session-extend-dialog/session-extend-dialog.component';
import {
  addAccount,
  removeAccount,
} from '../../user/store/accounts/account.actions';
import { setUser } from '../../user/store/user.actions';
import { selectUser } from '../../user/store/user.selectors';
import { translate } from '../../utils/intl/translate';
import { AuthService } from '../auth.service';
import { AppConfigService } from './../../services/app-config/app-config.service';

interface AuthState {
  error: string | null;
  loading: boolean;
}

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {
  private refreshTokenIntervalSubscription: Subscription | null = null;
  private modalService = inject(NgbModal);

  constructor(
    private authService: AuthService,
    private store: Store,
    private appConfigService: AppConfigService
  ) {
    super({ error: null, loading: false });
    this.store.select(selectUser).subscribe((user) => {
      if (user?.email) {
        if (!this.refreshTokenIntervalSubscription) {
          this.setupRefreshTokenInterval();
        }
      } else {
        this.clearRefreshTokenInterval();
      }
    });
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

  readonly login = this.effect<{
    email: string;
    password: string;
    rememberMe: boolean;
  }>((params$) =>
    params$.pipe(
      tap(() => {
        this.setLoading(true);
        this.setError(null);
      }),
      switchMap(({ email, password, rememberMe }) =>
        this.authService.login(email, password).pipe(
          tap((response) => {
            this.store.dispatch(setUser(response));
            if (rememberMe) {
              this.store.dispatch(addAccount({ email }));
            }
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

  readonly refresh = this.effect<{ email: string }>((params$) =>
    params$.pipe(
      tap(() => {
        this.setLoading(true);
        this.setError(null);
      }),
      switchMap(({ email }) =>
        this.authService.refresh(email).pipe(
          tap((response) => {
            this.store.dispatch(setUser(response));
          }),
          catchError((error) => {
            this.setError(translate('Refresh failed'));
            return of(error);
          }),
          finalize(() => this.setLoading(false))
        )
      )
    )
  );

  readonly remove = this.effect<{ email: string }>((params$) =>
    params$.pipe(
      tap(() => {
        this.setLoading(true);
        this.setError(null);
      }),
      switchMap(({ email }) =>
        this.authService.remove(email).pipe(
          tap(() => {
            this.store.dispatch(removeAccount({ email }));
          }),
          catchError((error) => {
            this.setError(translate('Remove account failed'));
            return of(error);
          }),
          finalize(() => this.setLoading(false))
        )
      )
    )
  );

  private async setupRefreshTokenInterval() {
    this.clearRefreshTokenInterval();
    const config = await firstValueFrom(this.appConfigService.get());
    const DELAY_BUFFER_IN_MILLISECONDS = 2000;

    const INTERVAL_IN_MILLISECONDS =
      config.maxAgeInMilliseconds -
      config.extendSessionDialogDisplayPeriodInMilliseconds -
      DELAY_BUFFER_IN_MILLISECONDS;

    this.refreshTokenIntervalSubscription = interval(
      INTERVAL_IN_MILLISECONDS
    ).subscribe(() => {
      this.store
        .select(selectUser)
        .pipe(take(1))
        .subscribe((user) => {
          if (user?.email) {
            this.promptSessionExtend(
              user.email,
              config.extendSessionDialogDisplayPeriodInMilliseconds
            );
          }
        });
    });
  }

  private clearRefreshTokenInterval() {
    if (this.refreshTokenIntervalSubscription) {
      this.refreshTokenIntervalSubscription.unsubscribe();
      this.refreshTokenIntervalSubscription = null;
    }
  }

  private promptSessionExtend(email: string, period: number) {
    const modalRef = this.modalService.open(SessionExtendDialogComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.email = email;

    modalRef.componentInstance.extendSession.subscribe(() => {
      this.refresh({ email });
      modalRef.close();
    });

    modalRef.componentInstance.logout.subscribe(() => {
      this.logout();
      modalRef.close();
    });

    timer(period).subscribe(() => {
      if (modalRef.componentInstance) {
        modalRef.close();
        this.logout();
      }
    });
  }

  private logout() {
    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        if (user?.email) {
          this.authService.logout().subscribe();
        }
      });
  }
}
