import api from './api';

const URLS = {
  createProductUrl: 'api/products',
};

const createProduct = (formData) => {
  return api.post(URLS.createProductUrl, formData);
};

const productApi = {
  createProduct,
};

export default productApi;
