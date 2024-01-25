import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { isAuthorized } from '../slices/auth.js';

const slice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('auth')) || { username: null, token: null },
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem('auth', JSON.stringify(payload));
      state.username = payload.username;
      state.token = payload.token;
    },
    logout: (state) => {
      localStorage.removeItem('auth');
      state.username = null;
      state.token = null;
    },
  },
});

export default slice;

export const { login, logout } = slice.actions;

export const selectAuth = (state) => state[slice.name];
export const selectToken = (state) => selectAuth(state).token;
export const isAuthorized = (state) => Boolean(selectToken(state));
export const selectUsername = (state) => selectAuth(state).username;

export const useIsAuthorized = () => useSelector(isAuthorized);
export const useUsername = () => useSelector(selectUsername);
