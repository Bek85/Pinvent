import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV;
const PRODUCT_ENDPOINT = `${BACKEND_URL}/api/products`;

//* Create a new product

const createProduct = async (formData) => {
  const res = await axios.post(`${PRODUCT_ENDPOINT}/api/products`, formData);

  return res.data;
};

const productService = {
  createProduct,
};

export default productService;
