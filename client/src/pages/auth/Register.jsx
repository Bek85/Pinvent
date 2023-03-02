import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';
import Card from 'pinvent/components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { registerUser } from 'pinvent/api/authApi';
import {
  setLoggedInStatus,
  setUserName,
} from 'pinvent/redux/features/auth/authSlice';
import Spinner from 'pinvent/components/spinner/Spinner';

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

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitUser = async (data) => {
    const { name, email, password } = data;
    const userData = { name, email, password };
    setIsLoading(true);
    try {
      const res = await registerUser(userData);

      await dispatch(setUserName(res.name));
      await dispatch(setLoggedInStatus(true));
      navigate('/dashboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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
