import api from './api';

const URLS = {
  productUrl: 'api/products',
};

const fetchProducts = () => {
  return api.get(URLS.productUrl);
};

const createProduct = (formData) => {
  return api.post(URLS.productUrl, formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Cache: 'no-cache',
    },
  });
};

const deleteProduct = (id) => {
  return api.delete(`URLS.productUrl/${id}`);
};

const productApi = {
  createProduct,
  fetchProducts,
  deleteProduct,
};

export default productApi;
