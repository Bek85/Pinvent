import styles from './auth.module.scss';
import { MdPassword } from 'react-icons/md';
import Card from 'pinvent/components/card/Card';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { resetPassword } from 'pinvent/services/authService';
import { toast } from 'react-toastify';
import { resetPassword } from 'pinvent/api/authApi';

const schema = yup.object({
  password: yup
    .string()
    .required('Password is a required field')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export default function Reset() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { resetToken } = useParams();

  const passwordResetSubmit = async (data) => {
    try {
      const res = await resetPassword(data, resetToken);
      toast.success(res.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit(passwordResetSubmit)}>
            <input
              type='password'
              placeholder='New Password'
              {...register('password')}
            />
            <span className={styles.error}>{errors.password?.message}</span>
            <input
              type='password'
              placeholder='Confirm New Password'
              {...register('confirmPassword')}
            />
            <span className={styles.error}>
              {errors.confirmPassword?.message}
            </span>

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Reset Password
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
