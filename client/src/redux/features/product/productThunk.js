import { createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '@/api/productApi';

// fetch a product

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (id, thunkAPI) => {
    try {
      const res = await productApi.fetchProduct(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// fetch products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const res = await productApi.fetchProducts();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Create new product
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (formData, thunkAPI) => {
    try {
      const res = await productApi.createProduct(formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Update an existing product
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (formData, thunkAPI) => {
    const { id } = formData;
    try {
      const res = await productApi.updateProduct(id, formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id, thunkAPI) => {
    try {
      await productApi.deleteProduct(id);
      await thunkAPI.dispatch(fetchProducts());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
