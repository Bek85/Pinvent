import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import authReducer from '@/redux/features/auth/authSlice';
import productReducer from '@/redux/features/product/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, dispatch, useSelector, useDispatch };
