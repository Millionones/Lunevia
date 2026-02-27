'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authCookies } from '../../lib/authCookies';

type User = {
  id: string;
  email: string;
  name?: string;
  roles?: any;
};

interface AuthState {
  token: string | null;
  user: User | null;
  access: string[];
}

const initialState: AuthState = {
  token: authCookies.getToken(),
  user: authCookies.getUser<User>(), // ✅ restore user from cookie
  access: authCookies.getAccess(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User, access: [] }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.access = action.payload.access;

      authCookies.setToken(action.payload.token);
      authCookies.setUser(action.payload.user); // ✅ store user
      authCookies.setAccess(action.payload.access);
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.access = [];

      authCookies.clearToken();
      authCookies.clearAccess();
      authCookies.clearUser(); // ✅ clear user
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
