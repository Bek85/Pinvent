import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'pinvent/redux/features//auth//authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
