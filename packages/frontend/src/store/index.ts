import { userReducer } from '../app/user/store/user.reducer';

export const STORE_KEYS = ['user'];

export const STORE_REDUCERS = {
  user: userReducer,
};
