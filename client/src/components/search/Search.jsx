import classes from './Search.module.scss';
import { BiSearch } from 'react-icons/bi';

export default function Search({ value, onChange }) {
  return (
    <div className={classes.search}>
      <BiSearch size={18} className={classes.icon} />
      <input
        type='text'
        placeholder='Search products'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
