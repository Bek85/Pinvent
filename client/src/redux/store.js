import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'pinvent/redux/features/auth/authSlice';
import productReducer from 'pinvent/redux/features/product/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
