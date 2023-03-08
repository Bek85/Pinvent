import './ProductDetail.scss';
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@/redux/store';
import { fetchProduct } from '@/redux/features/product/productThunk';
import Card from '@/components/card/Card';
import Spinner from '@/components/spinner/Spinner';
import useRedirectLoggedOutUser from '@/hooks/useRedirect';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  useRedirectLoggedOutUser('/login');
  const dispatch = useDispatch();

  const { id } = useParams();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { product, fetchProductStatus, errorMessage } = useSelector(
    (state) => state.product
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className='--color-success'>In Stock</span>;
    }
    return <span className='--color-danger'>Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchProduct(id));
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div className='product-detail'>
      <h3 className='--mt'>Product Detail</h3>
      <Card cardClass='card'>
        {fetchProductStatus === 'PENDING' && <Spinner />}
        {product && (
          <div className='detail'>
            <Card cardClass='group'>
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(product.qty)}</h4>
            <hr />
            <h4>
              <span className='badge'>Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {'$'}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.qty}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {'$'}
              {product.price * product.qty}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className='--color-dark'>
              Created on: {product.createdAt.toLocaleString('en-US')}
            </code>
            <br />
            <code className='--color-dark'>
              Last Updated: {product.updatedAt.toLocaleString('en-US')}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
}
