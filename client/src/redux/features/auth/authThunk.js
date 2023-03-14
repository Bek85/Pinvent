import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '@/api/authApi';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (credentials, thunkAPI) => {
    try {
      const res = await authApi.registerUser(credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, thunkAPI) => {
    try {
      const res = await authApi.updateUser(userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const res = await authApi.loginUser(credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    try {
      const res = await authApi.logoutUser();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email, thunkAPI) => {
    try {
      const res = await authApi.forgotPassword(email);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (resetToken, userData, thunkAPI) => {
    try {
      const res = await authApi.resetPassword(resetToken, userData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (credentials, thunkAPI) => {
    try {
      const res = await authApi.changePassword(credentials);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getLoginStatus = createAsyncThunk(
  'user/getLoginStatus',
  async (_, thunkAPI) => {
    try {
      const res = await authApi.getLoginStatus();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
