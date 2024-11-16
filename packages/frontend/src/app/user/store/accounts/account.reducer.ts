import { createReducer, on } from '@ngrx/store';
import { addAccount, removeAccount } from './account.actions';

export interface AccountState {
  accounts: string[];
}

const initialState: AccountState = {
  accounts: [],
};

export const accountReducer = createReducer(
  initialState,
  on(addAccount, (state, { account }) => ({
    ...state,
    accounts: [...new Set([...state.accounts, account])],
  })),
  on(removeAccount, (state, { account }) => ({
    ...state,
    accounts: state.accounts.filter((acc) => acc !== account),
  }))
);
