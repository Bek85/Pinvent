import styles from './auth.module.scss';
import { AiOutlineMail } from 'react-icons/ai';
import Card from 'pinvent/components/card/Card';
import { Link } from 'react-router-dom';

export default function Forgot() {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>
          <form>
            <input type='text' placeholder='Email' required name='email' />

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
