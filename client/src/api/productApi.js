import api from './api';

const URLS = {
  productUrl: 'api/products',
};

const fetchProduct = (id) => {
  return api.get(`${URLS.productUrl}/${id}`);
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

const updateProduct = (id, formData) => {
  return api.patch(`${URLS.productUrl}/${id}`, formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Cache: 'no-cache',
    },
  });
};

const deleteProduct = (id) => {
  return api.delete(`${URLS.productUrl}/${id}`);
};

const productApi = {
  fetchProduct,
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};

export default productApi;
