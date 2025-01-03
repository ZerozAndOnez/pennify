import { createReducer, on } from '@ngrx/store';
import { clearUser, setUser } from './user.actions';

/**
 * // TODO TODOLuxury: Have a shared package in monorepo for the interfaces
 */
export interface UserState {
  _id: string | null;
  name: string | null;
  email: string | null;
  accessToken: string | null;
  profileUrl: string | null;
}

const initialState: UserState = {
  _id: null,
  name: null,
  email: null,
  accessToken: null,
  profileUrl: null,
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, user) => ({
    ...state,
    ...user,
  })),
  on(clearUser, (state) => ({
    ...state,
    ...initialState,
  }))
);
