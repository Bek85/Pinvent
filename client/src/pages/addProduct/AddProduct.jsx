import ProductForm from '@/components/product/productForm/ProductForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const initialState = {
  name: '',
  category: '',
  qty: '',
  price: '',
};

export default function AddProduct() {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  const { isLoading } = useSelector((state) => state.product);

  const { name, category, qty, price } = product;

  return (
    <div>
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm />
    </div>
  );
}
