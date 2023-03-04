import { createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '@/api/productApi';

// Create new product
export const createProduct = createAsyncThunk(
  'product/create',
  async (formData, thunkAPI) => {
    try {
      const res = await productApi.createProduct(formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);