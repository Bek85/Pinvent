import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = process.meta.VITE_BACKEND_URL;

export const registerUser = async (userCredentials) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/api/users/register`,
      userCredentials,
      {
        withCredentials: true,
      }
    );
    if (res.statusText === 'OK') {
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
