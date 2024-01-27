import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';

import routes from './routes';

import { createSelector } from '@reduxjs/toolkit';
import { selectToken } from '../slices/auth';
import { selectCurrentChannelId } from '../slices/ui';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState());

      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),
  tagTypes: ['Channel', 'Message'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => routes.channels(),
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channels(),
        method: 'POST',
        body: channel,
      }),
    }),
    updateChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channel(channel.id),
        method: 'PATCH',
        body: channel,
      }),
    }),
    deleteChannel: builder.mutation({
      query: (id) => ({
        url: routes.channel(id),
        method: 'DELETE',
        invalidatesTags: ['Channel', 'Message'],
      }),
    }),
    getMessages: builder.query({
      query: () => routes.messages(),
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messages(),
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
} = api;

export const selectCurrentChannel = createSelector(selectCurrentChannelId, (currentChannelId) =>
  api.endpoints.getChannels.select(currentChannelId)
);

export const selectCurrentChannelMessages = createSelector(
  selectCurrentChannelId,
  (state, currentChannelId) =>
    api.endpoints.getMessages
      .select()(state)
      .data.filter((m) => m.channelId === currentChannelId)
);

export const useCurrentChannel = () => useSelector(selectCurrentChannel);
export const useCurrentChannelMessages = () => useSelector(selectCurrentChannelMessages);
