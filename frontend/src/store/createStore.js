import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from './api';
import authSlice from './auth';
import uiSlice from './ui';

const createStore = () => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      [authSlice.name]: authSlice.reducer,
      [uiSlice.name]: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export default createStore;
