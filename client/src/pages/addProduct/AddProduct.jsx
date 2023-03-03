import ProductForm from '@/components/product/productForm/ProductForm';
import { useAppSelector } from '@/redux/hook';
import { useState } from 'react';

const productProps = {
  name: '',
  category: '',
  qty: '',
  price: '',
};

export default function AddProduct() {
  const [product, setProduct] = useState(productProps);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  const { createProductStatus } = useAppSelector((state) => state.product);

  const { name, category, qty, price } = product;

  return (
    <div>
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm />
    </div>
  );
}
