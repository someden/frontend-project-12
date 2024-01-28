import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { api } from './api';

const defaultChannelId = '1';

const slice = createSlice({
  name: 'ui',
  initialState: {
    modal: {
      isOpened: false,
      type: null,
      extra: null,
    },
    currentChannelId: defaultChannelId,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.modal.isOpened = true;
      state.modal.type = payload.type;
      state.modal.extra = payload.extra ?? null;
    },
    closeModal: (state) => {
      state.modal.isOpened = false;
      state.modal.type = null;
      state.modal.extra = null;
    },
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
export const selectModal = (state) => selectUi(state).modal;
export const isModalOpened = (state) => selectModal(state).isOpened;
export const selectModalType = (state) => selectModal(state).type;
export const selectModalExtra = (state) => selectModal(state).extra;
export const selectCurrentChannelId = (state) => selectUi(state).currentChannelId;

export const useIsModalOpened = () => useSelector(isModalOpened);
export const useModalType = () => useSelector(selectModalType);
export const useModalExtra = () => useSelector(selectModalExtra);
