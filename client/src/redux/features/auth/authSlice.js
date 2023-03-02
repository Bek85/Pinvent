import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem('name'));

const initialState = {
  // isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  name: name || '',
  user: {
    name: '',
    email: '',
    phone: '',
    bio: '',
    photo: '',
  },
  userId: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedInStatus(state, action) {
      localStorage.setItem('isLoggedIn', JSON.stringify(action.payload));
      state.isLoggedIn = action.payload;
    },
    setUserName(state, action) {
      localStorage.setItem('name', JSON.stringify(action.payload));
      state.name = action.payload;
    },
    saveUser(state, action) {
      const profile = action.payload;
      state.user = { ...profile };
    },
  },
});

export const { setLoggedInStatus, setUserName, saveUser } = authSlice.actions;

export default authSlice.reducer;
