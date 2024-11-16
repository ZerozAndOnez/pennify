import { accountReducer } from '../app/user/store/accounts/account.reducer';
import { userReducer } from '../app/user/store/user.reducer';

export const STORE_KEYS = ['user', 'accounts'];

export const STORE_REDUCERS = {
  user: userReducer,
  accounts: accountReducer,
};
