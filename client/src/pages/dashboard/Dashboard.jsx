import ProductList from '@/components/product/product-list/ProductList';
import ProductSummary from '@/components/product/product-summary/ProductSummary';
import Spinner from '@/components/spinner/Spinner';
import useRedirectLoggedOutUser from '@/hooks/useRedirect';
import { fetchProducts } from '@/redux/features/product/productThunk';
import { dispatch, useSelector } from '@/redux/store';
import { useEffect } from 'react';

export default function Dashboard() {
  useRedirectLoggedOutUser('/login');
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { products, fetchProductsStatus } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchProducts());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div>
      <ProductSummary products={products} />
      {fetchProductsStatus === 'PENDING' && <Spinner />}
      {fetchProductsStatus === 'SUCCESS' && <ProductList products={products} />}
    </div>
  );
}
