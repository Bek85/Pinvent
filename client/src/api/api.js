import axios from 'axios';

const DEV_BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV;

const axiosParams = {
  baseURL: import.meta.env.NODE_ENV === 'development' ? DEV_BACKEND_URL : '/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Cache: 'no-cache',
  },
  withCredentials: true,
};

const axiosInstance = axios.create(axiosParams);

const withLogger = async (promise) =>
  promise.catch((error) => {
    /*
    Always log errors in dev environment
    if (import.meta.env.NODE_ENV !== 'development') throw error
  */
    // Log error only if VITE_APP_DEBUG_API env is set to true
    if (!import.meta.env.VITE_APP_DEBUG_API) throw error;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);

    throw error;
  });

const api = (axios) => {
  return {
    get: (url, config = {}) => withLogger(axios.get(url, config)),
    delete: (url, config = {}) => withLogger(axios.delete(url, config)),
    post: (url, body, config = {}) => withLogger(axios.post(url, body, config)),
    patch: (url, body, config = {}) =>
      withLogger(axios.patch(url, body, config)),
    put: (url, body, config = {}) => withLogger(axios.put(url, body, config)),
  };
};

export default api(axiosInstance);
