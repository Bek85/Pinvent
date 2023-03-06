import './ProductSummary.scss';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsCart4, BsCartX } from 'react-icons/bs';
import { BiCategory } from 'react-icons/bi';
import InfoBox from '@/components/info-box/InfoBox';
import { formatNumbers } from '@/utils/formatNumbers';
import { dispatch, useSelector } from '@/redux/store';
import {
  getCategory,
  getStockVal,
  getTotalVal,
} from '@/redux/features/product/productSlice';
import { useEffect } from 'react';

// Icons
const earningIcon = <AiFillDollarCircle size={40} color='#fff' />;
const productIcon = <BsCart4 size={40} color='#fff' />;
const categoryIcon = <BiCategory size={40} color='#fff' />;
const outOfStockIcon = <BsCartX size={40} color='#fff' />;

export default function ProductSummary({ products }) {
  const { totalStoreValue, outOfStock, category } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getTotalVal(products));
    dispatch(getStockVal(products));
    dispatch(getCategory(products));
  }, [dispatch, products]);

  return (
    <div className='product-summary'>
      <h3 className='--mt'>Inventory Stats</h3>
      <div className='info-summary'>
        <InfoBox
          icon={productIcon}
          title={'Total Products'}
          count={products.length}
          bgColor='card1'
        />
        <InfoBox
          icon={earningIcon}
          title={'Total Store Value'}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}  `}
          bgColor='card2'
        />
        <InfoBox
          icon={outOfStockIcon}
          title={'Out of Stock'}
          count={outOfStock}
          bgColor='card3'
        />
        <InfoBox
          icon={categoryIcon}
          title={'All Categories'}
          count={category.length}
          bgColor='card4'
        />
      </div>
    </div>
  );
}
