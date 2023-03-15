import {
  forgotPassword,
  getLoginStatus,
  loginUser,
  updateUser,
  changePassword,
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

const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
const user = JSON.parse(localStorage.getItem('user')) || false;

const initialState = {
  isLoggedIn: isLoggedIn,
  user: user,
  errorMessage: '',
  loginUserStatus: IDLE,
  updateUserStatus: IDLE,
  changePasswordStatus: IDLE,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedInStatus(state, action) {
      state.isLoggedIn = action.payload;
      localStorage.setItem('isLoggedIn', JSON.stringify(action.payload));
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
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserStatus = ERROR;
        state.errorMessage = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserStatus = PENDING;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUserStatus = SUCCESS;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserStatus = ERROR;
        state.errorMessage = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.changePasswordStatus = PENDING;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.errorMessage = '';
        state.changePasswordStatus = SUCCESS;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordStatus = ERROR;
        state.errorMessage = action.payload;
      });
  },
});

export const { setLoggedInStatus, saveUser } = authSlice.actions;

export default authSlice.reducer;
