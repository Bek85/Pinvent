import styles from './auth.module.scss';
import { MdPassword } from 'react-icons/md';
import Card from 'pinvent/components/card/Card';
import { Link } from 'react-router-dom';

export default function Reset() {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>
          <form>
            <input
              type='password'
              placeholder='New Password'
              required
              name='password'
            />
            <input
              type='password'
              placeholder='Confirm New Password'
              required
              name='password'
            />

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
