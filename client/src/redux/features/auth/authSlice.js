import {
  forgotPassword,
  getLoginStatus,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
} from '@/redux/features/auth/authThunk';
import {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR,
} from '@/redux/features/constants/apiStatus';
import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem('name')) || '';
const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

const initialState = {
  isLoggedIn: isLoggedIn,
  user: null,
  errorMessage: '',
  loginUserStatus: IDLE,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedInStatus(state, action) {
      state.isLoggedIn = action.payload;
      localStorage.setItem('isLoggedIn', JSON.stringify(action.payload));
    },
    setUserName(state, action) {
      state.name = action.payload;
      localStorage.setItem('name', JSON.stringify(action.payload));
    },
    saveUser(state, action) {
      const profile = action.payload;
      state.user = { ...profile };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserStatus = PENDING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserStatus = SUCCESS;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserStatus = ERROR;
        state.errorMessage = action.payload;
      });
  },
});

export const { setLoggedInStatus, setUserName, saveUser } = authSlice.actions;

export default authSlice.reducer;
