import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';
import Card from '@/components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { registerUser } from '@/api/authApi';
import { setLoggedInStatus } from '@/redux/features/auth/authSlice';
import Spinner from '@/components/spinner/Spinner';
import { dispatch, useSelector } from '@/redux/store';

const schema = yup.object({
  name: yup.string().required('Name is a required field'),
  email: yup
    .string()
    .required('Email is a required field')
    .email('Email is not valid'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitUser = async (data) => {
    const { name, email, password } = data;
    const userData = { name, email, password };
    setIsLoading(true);
    try {
      await registerUser(userData);
      dispatch(setLoggedInStatus(true));
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
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit(submitUser)}>
            <input type='text' placeholder='Name' {...register('name')} />
            <span className={styles.error}>{errors.name?.message}</span>

            <input type='email' placeholder='Email' {...register('email')} />
            <span className={styles.error}>{errors.email?.message}</span>
            <input
              type='password'
              placeholder='Password'
              {...register('password')}
            />
            <span className={styles.error}>{errors.password?.message}</span>
            <input
              type='password'
              placeholder='Confirm password'
              {...register('confirmPassword')}
            />
            <span className={styles.error}>
              {errors.confirmPassword?.message}
            </span>
            <button type='submit' className='--btn --btn-primary --btn-block '>
              Register
            </button>
          </form>

          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p className='--px'>Already have an account?</p>
            <Link to='/login'>Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
}
