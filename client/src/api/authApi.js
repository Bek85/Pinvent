import api from './api';

const URLS = {
  registerUserUrl: 'api/users/register',
  loginUserUrl: 'api/users/login',
  logoutUserUrl: 'api/users/logout',
  updateUserUrl: 'api/users/updateuser',
  forgotPasswordUrl: 'api/users/forgotpassword',
  resetPasswordUrl: 'api/users/resetpassword',
  loginStatusUrl: 'api/users/loggedin',
  changePasswordUrl: '/api/users/changepassword',
};

export const registerUser = (userCredentials) => {
  return api.post(URLS.registerUserUrl, userCredentials);
};

export const loginUser = (userCredentials) => {
  return api.post(URLS.loginUserUrl, userCredentials);
};

export const updateUser = (userData) => {
  return api.patch(URLS.updateUserUrl, userData);
};

export const logoutUser = () => {
  return api.get(URLS.logoutUserUrl);
};

export const forgotPassword = (email) => {
  return api.post(URLS.forgotPasswordUrl, email);
};

export const resetPassword = (resetToken, userData) => {
  return api.put(`${URLS.resetPasswordUrl}/${resetToken}`, userData);
};

export const getLoginStatus = () => {
  return api.get(URLS.loginStatusUrl);
};

export const changePassword = (credentials) => {
  return api.patch(URLS.changePasswordUrl, credentials);
};

const authApi = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getLoginStatus,
};

export default authApi;
