import { configureStore } from '@reduxjs/toolkit';

import { api } from './api/apiSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import productReducer from './features/products/productSlice';

// import logger from './middleware/logger';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
