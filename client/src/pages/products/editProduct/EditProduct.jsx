import ProductForm from '@/components/product/product-form/ProductForm';
import Spinner from '@/components/spinner/Spinner';
import { useSelector } from '@/redux/store';
import { useParams } from 'react-router-dom';

export default function EditProduct() {
  const { updateProductStatus, products } = useSelector(
    (state) => state.product
  );
  const { id } = useParams();

  const product = products.find((product) => product._id === id);

  return (
    <div>
      {updateProductStatus === 'PENDING' && <Spinner />}
      <h3 className='--mt'>Update Product</h3>
      <ProductForm isEdit product={product} />
    </div>
  );
}
