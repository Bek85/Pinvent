import { logoutUser } from 'pinvent/services/authService';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME } from 'pinvent/redux/features/auth/authSlice';
import { useNavigate } from 'react-router';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    await dispatch(SET_NAME(''));
    navigate('/');
  };
  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3>
          <span className='--fw-thin'>Welcome, </span>
          <span className='--color-danger'>Alex </span>
        </h3>
        <button onClick={logout} className='--btn --btn-danger'>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
}
