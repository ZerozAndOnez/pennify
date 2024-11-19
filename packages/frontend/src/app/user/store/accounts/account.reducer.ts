import { createReducer, on } from '@ngrx/store';
import { addAccount, removeAccount } from './account.actions';
import { getGravatarUrl } from '../../../utils/external/avatar/avatar.utils';

export interface Account {
  email: string;
  profileUrl?: string;
}

export interface AccountState {
  accounts: Account[];
}

const initialState: AccountState = {
  accounts: [],
};

export const accountReducer = createReducer(
  initialState,
  on(addAccount, (state, account) => ({
    ...state,
    accounts: [
      ...state.accounts,
      {
        ...account,
        profileUrl: account?.profileUrl ?? getGravatarUrl(account.email),
      },
    ],
  })),
  on(removeAccount, (state, account) => ({
    ...state,
    accounts: state.accounts.filter((a) => a.email !== account.email),
  }))
);
