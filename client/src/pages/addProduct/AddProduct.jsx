import ProductForm from '@/components/product/productForm/ProductForm';
import Spinner from '@/components/spinner/Spinner';
import { useSelector } from '@/redux/store';
import { useState } from 'react';

const productProps = {
  image: '',
  name: '',
  category: '',
  qty: '',
  price: '',
  description: '',
};

export default function AddProduct() {
  const [product, setProduct] = useState(productProps);

  const { createProductStatus } = useSelector((state) => state.product);

  return (
    <div>
      {createProductStatus === 'PENDING' && <Spinner />}
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm product={product} />
    </div>
  );
}
