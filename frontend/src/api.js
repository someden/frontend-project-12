import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import routes from './routes';

import { selectToken } from '../slices/auth';

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
