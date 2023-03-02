import api from './api';

const URLS = {
  registerUserUrl: 'api/users/register',
  loginUserUrl: 'api/users/login',
  logoutUserUrl: 'api/users/logout',
  forgotPasswordUrl: 'api/users/forgotpassword',
  resetPasswordUrl: 'api/users/resetpassword',
  loginStatusUrl: 'api/users/loggedin',
};

export const registerUser = (userCredentials) => {
  return api.post(URLS.registerUserUrl, userCredentials);
};

export const loginUser = (userCredentials) => {
  return api.post(URLS.loginUserUrl, userCredentials);
};

export const logoutUser = (userCredentials) => {
  return api.get(URLS.logoutUserUrl, userCredentials);
};

export const forgotPassword = (email) => {
  return api.post(URLS.forgotPasswordUrl, email);
};

export const resetPassword = (userData, resetToken) => {
  return api.put(`${URLS.resetPasswordUrl}/${resetToken}`, userData);
};

export const getLoginStatus = () => {
  return api.get(URLS.loginStatusUrl);
};
