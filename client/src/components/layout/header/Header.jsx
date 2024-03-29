import { setLoggedInStatus } from '@/redux/features/auth/authSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { dispatch, useSelector } from '@/redux/store';
import { logoutUser } from '@/redux/features/auth/authThunk';

export default function Header() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const logout = async () => {
    await dispatch(logoutUser());
    toast.success('Logged out successfully');
    dispatch(setLoggedInStatus(false));
    navigate('/');
  };
  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3>
          <span className='--fw-thin'>Welcome, </span>
          <span className='--color-danger'>{user?.name} </span>
        </h3>
        <button onClick={logout} className='--btn --btn-danger'>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
}
