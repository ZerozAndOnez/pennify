import { createReducer, on } from '@ngrx/store';
import { addAccount, removeAccount } from './account.actions';

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
    accounts: [...state.accounts, account],
  })),
  on(removeAccount, (state, account) => ({
    ...state,
    accounts: state.accounts.filter((a) => a.email !== account.email),
  }))
);
