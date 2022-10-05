import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { rootState } from "./main";

const initialState: {
  uid: string | null;
  isLoading: boolean;
  error: Error | null;
} = { uid: null, isLoading: false, error: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signedIn: (state, action) => {
      state.isLoading = false;
      state.uid = action.payload;
      state.error = null;
    },
    signInFailed: (state, action) => {
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

export const uidSelector = () =>
  useSelector((state: rootState) => state.user.uid);

export const { signIn, signInFailed, signedIn } = userSlice.actions;
