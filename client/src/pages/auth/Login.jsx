import styles from './auth.module.scss';
import { BiLogIn } from 'react-icons/bi';
import Card from '@/components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import {
  setLoggedInStatus,
  setUserName,
} from '@/redux/features/auth/authSlice';
import Spinner from '@/components/spinner/Spinner';
import { useState } from 'react';
import { loginUser } from '@/api/authApi';
import { toast } from 'react-toastify';

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Email is not valid'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitUserLogin = async (data) => {
    const { email, password } = data;
    const userData = { email, password };
    setIsLoading(true);
    try {
      const res = await loginUser(userData);

      await dispatch(setLoggedInStatus(true));
      await dispatch(setUserName(res.data.name));
      toast.success(`${res.data.name} logged in successfully`);
      navigate('/dashboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Spinner />}

      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(submitUserLogin)}>
            <input type='email' placeholder='Email' {...register('email')} />
            <span className={styles.error}>{errors.email?.message}</span>
            <input
              type='password'
              placeholder='Password'
              {...register('password')}
            />
            <span className={styles.error}>{errors.password?.message}</span>
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
          </form>
          <Link to='/forgotpassword'>Forgot Password</Link>
          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p className='--px'>Don't have an account?</p>
            <Link to='/register'>Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
}
