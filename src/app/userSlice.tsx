import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { user } from '../types/user';
import { rootState } from './main';

type initialState = {
  uid: string | null;
  isLoading: boolean;
  error: unknown | null;
};

const initialState: initialState = { uid: null, isLoading: false, error: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signedIn: (state, action: PayloadAction<user['uid']>) => {
      state.isLoading = false;
      state.uid = action.payload;
      state.error = null;
    },
    signInFailed: (state, action: PayloadAction<unknown>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.uid = null;
    },
    signIn: (state) => {
      state.isLoading = true;
    },
  },
});

export default userSlice.reducer;

export const selectUid = () => (state: rootState) => state.user.uid;

export const { signIn, signInFailed, signedIn } = userSlice.actions;
