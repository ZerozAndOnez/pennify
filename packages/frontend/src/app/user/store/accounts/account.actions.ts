import { createAction, props } from '@ngrx/store';
import { Account } from './account.reducer';

const ACTION_PREFIX = '[Account]';

export const addAccount = createAction(
  `${ACTION_PREFIX} Add Account`,
  props<Account>()
);

export const removeAccount = createAction(
  `${ACTION_PREFIX} Remove Account`,
  props<Account>()
);
