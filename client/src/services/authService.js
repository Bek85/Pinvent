import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV;

export const registerUser = async (userCredentials) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userCredentials,
      {
        withCredentials: true,
      }
    );

    if (res.status === 201) {
      toast.success('User registered successfully');
    }
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const loginUser = async (userCredentials) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/users/login`, userCredentials);

    if (res.status === 200) {
      toast.success('User logged in successfully');
    }
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/users/logout`);

    if (res.status === 200) {
      toast.success('User logged out successfully');
    }
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/users/forgotpassword`, email);

    if (res.status === 200) {
      toast.success(res.data.message);
    }
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
export const resetPassword = async (userData, resetToken) => {
  try {
    const res = await axios.put(
      `${BACKEND_URL}/users/resetpassword/${resetToken}`,
      userData
    );
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getLoginStatus = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
    return res.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
