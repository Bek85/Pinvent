import './ProductList.scss';
import truncate from '@/utils/truncate';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import Search from '@/components/search/Search';
import { useState } from 'react';

export default function ProductList({ products }) {
  const [search, setSearch] = useState('');
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
              {products.map((product, idx) => {
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
                      <AiOutlineEye size={25} color='purple' />
                      <FaEdit size={20} color='green' />
                      <FaTrashAlt size={20} color='red' />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
