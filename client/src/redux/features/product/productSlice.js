import { createSlice } from '@reduxjs/toolkit';
import { createProduct } from './productThunk';
import { IDLE, PENDING, SUCCESS, ERROR } from '../constants/apiStatus';
import { toast } from 'react-toastify';

const initialState = {
  product: null,
  products: [],
  createProductStatus: IDLE,
  message: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    calculateStoreVal(state, action) {
      console.log('store value');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.createProductStatus = PENDING;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductStatus = SUCCESS;
        state.products.push(action.payload);
        toast.success('Product added successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductStatus = ERROR;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { calculateStoreVal } = productSlice.actions;

export default productSlice.reducer;
