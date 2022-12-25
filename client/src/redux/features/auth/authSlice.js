import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem('name'));

const initialState = {
  isLoggedIn: false,
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
    setLoggedInStat(state, action) {
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
