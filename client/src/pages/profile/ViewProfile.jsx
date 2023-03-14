import { useSelector } from '@/redux/store';
import { Link } from 'react-router-dom';
import Card from '@/components/card/Card';
import useRedirectLoggedOutUser from '@/hooks/useRedirect';
import './profile.scss';

export default function Profile() {
  useRedirectLoggedOutUser('/login');

  const { user } = useSelector((state) => state.auth);

  return (
    <div className='profile --my2'>
      <>
        <Card cardClass={'card --flex-dir-column'}>
          <span className='profile-photo'>
            <img src={user.photo} alt='profilepic' />
          </span>
          <span className='profile-data'>
            <p>
              <b>Name : </b> {user.name}
            </p>
            <p>
              <b>Email : </b> {user.email}
            </p>
            <p>
              <b>Phone : </b> {user.phone}
            </p>
            <p>
              <b>Bio : </b> {user.bio}
            </p>
            <div>
              <Link to='/edit-profile'>
                <button className='--btn --btn-primary'>Edit Profile</button>
              </Link>
            </div>
          </span>
        </Card>
      </>
    </div>
  );
}
