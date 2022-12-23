import styles from './auth.module.scss';
import { TiUserAddOutline } from 'react-icons/ti';
import Card from 'pinvent/components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { validateEmail } from 'pinvent/services/authService';
import { registerUser } from '../../services/authService';
import {
  SET_NAME,
  SET_LOGIN,
  SAVE_USER,
} from 'pinvent/redux/features/auth/authSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, email, password, passwordConfirm } = formData;

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!name || !email || !password) {
      return toast.error('All fields are required');
    }
    if (password !== passwordConfirm) {
      return toast.error('Passwords do not match');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    const userData = {
      name,
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      await dispatch(SAVE_USER(data));
      navigate('/dashboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={handleInputChange}
              type='text'
              placeholder='Name'
              name='name'
            />
            <input
              value={email}
              onChange={handleInputChange}
              type='email'
              placeholder='Email'
              name='email'
            />
            <input
              value={password}
              onChange={handleInputChange}
              type='password'
              placeholder='Password'
              name='password'
            />
            <input
              value={passwordConfirm}
              onChange={handleInputChange}
              type='password'
              placeholder='Confirm password'
              name='passwordConfirm'
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
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
