import { createAction, props } from '@ngrx/store';

const ACTION_PREFIX = '[Account]';

export const addAccount = createAction(
  `${ACTION_PREFIX} Add Account`,
  props<{ account: string }>()
);

export const removeAccount = createAction(
  `${ACTION_PREFIX} Remove Account`,
  props<{ account: string }>()
);
