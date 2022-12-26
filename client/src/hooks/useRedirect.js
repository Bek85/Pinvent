import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInStatus } from 'pinvent/redux/features/auth/authSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      dispatch(setLoggedInStatus(isLoggedIn));
      if (!isLoggedIn) {
        toast.info('Session expired. Please login to continue');
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, dispatch, path]);
};

export default useRedirectLoggedOutUser;
