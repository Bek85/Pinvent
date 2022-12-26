import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
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
  extraReducers: (builder) => {},
});

export const { calculateStoreVal } = productSlice.actions;

export default productSlice.reducer;
