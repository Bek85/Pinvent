import api from './api';

const URLS = {
  fetchProductsUrl: 'api/products',
  createProductUrl: 'api/products',
};

const fetchProducts = () => {
  return api.get(URLS.fetchProductsUrl);
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
  fetchProducts,
};

export default productApi;
