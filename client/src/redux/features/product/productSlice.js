import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProduct,
  fetchProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from './productThunk';
import { IDLE, PENDING, SUCCESS, ERROR } from '../constants/apiStatus';
import { toast } from 'react-toastify';

const initialState = {
  product: null,
  products: [],
  filteredProducts: [],
  fetchProductStatus: IDLE,
  fetchProductsStatus: IDLE,
  createProductStatus: IDLE,
  updateProductStatus: IDLE,
  deleteProductStatus: IDLE,
  errorMessage: '',
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    filterProducts(state, action) {
      const { products, search } = action.payload;
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredProducts = filteredProducts;
    },
    getTotalVal(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { price, qty } = item;
        const productValue = price * qty;
        return array.push(productValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    getStockVal(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { qty } = item;

        return array.push(qty);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === '0') {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    getCategory(state, action) {
      const products = action.payload;
      const array = [];
      products.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.fetchProductStatus = PENDING;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.fetchProductStatus = SUCCESS;
        state.product = action.payload;
        toast.success('Product fetched successfully');
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.fetchProductStatus = ERROR;
        state.errorMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(fetchProducts.pending, (state) => {
        state.fetchProductsStatus = PENDING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProductsStatus = SUCCESS;
        state.products = action.payload;
        toast.success('Products fetched successfully');
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetchProductsStatus = ERROR;
        state.errorMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(createProduct.pending, (state) => {
        state.createProductStatus = PENDING;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createProductStatus = SUCCESS;
        state.products.push(action.payload);
        toast.success('Product added successfully');
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createProductStatus = ERROR;
        state.errorMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductStatus = PENDING;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteProductStatus = SUCCESS;
        toast.success('Product deleted successfully');
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteProductStatus = ERROR;
        state.errorMessage = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.updateProductStatus = PENDING;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.updateProductStatus = SUCCESS;
        toast.success('Product updated successfully');
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateProductStatus = ERROR;
        state.errorMessage = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { filterProducts, getTotalVal, getStockVal, getCategory } =
  productSlice.actions;

export default productSlice.reducer;
