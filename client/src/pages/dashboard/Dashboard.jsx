import ProductList from '@/components/product/product-list/ProductList';
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
      <h2>Dashboard</h2>
      <ProductList />
    </div>
  );
}
