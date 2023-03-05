import api from './api';

const URLS = {
  createProductUrl: 'api/products',
};

const createProduct = (formData) => {
  return api.post(URLS.createProductUrl, formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Cache: 'no-cache',
    },
  });
};

const productApi = {
  createProduct,
};

export default productApi;
