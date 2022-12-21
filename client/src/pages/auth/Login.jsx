import styles from './auth.module.scss';
import { BiLogIn } from 'react-icons/bi';
import Card from 'pinvent/components/card/Card';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form>
            <input type='text' placeholder='Email' required name='email' />
            <input
              type='password'
              placeholder='Password'
              required
              name='password'
            />
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
