import { createSlice } from '@reduxjs/toolkit';

import { api } from '../api.js';

const defaultChannelId = '1';

const slice = createSlice({
  name: 'ui',
  initialState: {
    currentChannelId: defaultChannelId,
  },
  reducers: {
    setCurrentChannelId(state, { payload }) {
      state.currentChannelId = payload.channelId;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.addChannel.matchFulfilled, (state, action) => {
      state.currentChannelId = action.payload.id;
    });
  },
});

export default slice;

export const { actions } = slice;

export const selectUi = (state) => state[slice.name];
export const selectCurrentChannelId = (state) => selectUi(state).currentChannelId;
