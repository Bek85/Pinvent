import './ProductList.scss';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import truncate from '@/utils/truncate';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import Search from '@/components/search/Search';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useSelector, dispatch } from '@/redux/store';
import { filterProducts } from '@/redux/features/product/productSlice';
import { deleteProduct } from '@/redux/features/product/productThunk';

export default function ProductList({ products }) {
  const [search, setSearch] = useState('');
  const { filteredProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(filterProducts({ products, search }));
  }, [search, products, dispatch]);

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete the item?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => dispatch(deleteProduct(id)),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  };

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Inventory Items</h3>
          </span>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className='table'>
          {products.length === 0 && (
            <p>No product found, please add a product...</p>
          )}
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, idx) => {
                const { _id, name, category, price, qty } = product;
                return (
                  <tr key={_id}>
                    <td>{idx + 1}</td>
                    <td>{truncate(name, 15)}</td>
                    <td>{category}</td>
                    <td>${price}</td>
                    <td>{qty}</td>
                    <td>${(qty * price).toFixed(2)}</td>
                    <td className='icons'>
                      <Link to={`/product-detail/${_id}`}>
                        <AiOutlineEye size={25} color='purple' />
                      </Link>
                      <FaEdit size={20} color='green' />
                      <FaTrashAlt
                        onClick={() => confirmDelete(_id)}
                        size={20}
                        color='red'
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel='Prev'
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='activePage'
        />
      </div>
    </div>
  );
}
