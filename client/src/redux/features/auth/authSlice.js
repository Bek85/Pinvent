import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem('name')) || '';
const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;

const initialState = {
  isLoggedIn: isLoggedIn,
  name: name,
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
});

export const { setLoggedInStatus, setUserName, saveUser } = authSlice.actions;

export default authSlice.reducer;
