import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';

const selectAccountState = createFeatureSelector<AccountState>('accounts');

export const selectAccounts = createSelector(
  selectAccountState,
  (state) => state.accounts
);
