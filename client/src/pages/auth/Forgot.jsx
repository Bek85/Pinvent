import styles from './auth.module.scss';
import { AiOutlineMail } from 'react-icons/ai';
import Card from 'pinvent/components/card/Card';
import { Link } from 'react-router-dom';
// import { forgotPassword } from 'pinvent/services/authService';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPassword } from 'pinvent/api/authApi';
import { toast } from 'react-toastify';

const schema = yup.object({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Email is not valid'),
});

export default function Forgot() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const forgotPasswordSubmit = async (data) => {
    try {
      const res = await forgotPassword(data);
      toast.success(`${res.data.message}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit(forgotPasswordSubmit)}>
            <input type='email' placeholder='Email' {...register('email')} />
            <span className={styles.error}>{errors.email?.message}</span>

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Get Reset Email
            </button>
            <div className={styles.links}>
              <Link to='/'> - Home</Link>
              <Link to='/login'> - Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
