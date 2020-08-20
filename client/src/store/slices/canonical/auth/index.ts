import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import State from "@/store/state";

import { Login } from "./action-payloads";

const initialState: State.Canonical.Auth = {
  user: null,
  token: null,
  isLoggingIn: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, _: PayloadAction<Login.start.payload>) {
      state.isLoggingIn = true;
    },
    loginSuccess(state, { payload }: PayloadAction<Login.success.payload>) {
      state.isLoggingIn = false;
      state.user = payload.user;
    },
    loginFailure(state, { payload }: PayloadAction<Login.failure.payload>) {
      state.isLoggingIn = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout } = auth.actions;

export default auth.reducer;
