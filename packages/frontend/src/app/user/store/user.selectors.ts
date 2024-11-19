import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { getGravatarUrl } from '../../utils/external/avatar/avatar.utils';

const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, (state) => {
  return { ...state, profileUrl: getGravatarUrl(state?.email as string) };
});
