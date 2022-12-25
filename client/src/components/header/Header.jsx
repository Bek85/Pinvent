import { logoutUser } from 'pinvent/services/authService';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoggedInStatus,
  setUserName,
} from 'pinvent/redux/features/auth/authSlice';
import { useNavigate } from 'react-router';

export default function Header() {
  const { name } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await logoutUser();
    await dispatch(setLoggedInStatus(false));
    await dispatch(setUserName(''));
    navigate('/');
  };
  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3>
          <span className='--fw-thin'>Welcome, </span>
          <span className='--color-danger'>{name} </span>
        </h3>
        <button onClick={logout} className='--btn --btn-danger'>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
}
