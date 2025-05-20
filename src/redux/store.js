// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import itemsReducer from './itemsSlice';
import otherCostsReducer from './otherCostsSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     items: itemsReducer,
//     otherCosts: otherCostsReducer,
//   },
// });

import localStorageMiddleware from './localStorageMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    otherCosts: otherCostsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});