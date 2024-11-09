import { createAction, props } from '@ngrx/store';

import { UserState } from './user.reducer';

const ACTION_PREFIX = '[User]';

export const setUser = createAction(
  `${ACTION_PREFIX} Set User`,
  props<UserState>()
);

export const clearUser = createAction(`${ACTION_PREFIX} Clear User`);
