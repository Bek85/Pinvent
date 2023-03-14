import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/card/Card';

import './profile.scss';
import { toast } from 'react-toastify';
import ChangePassword from '@/components/change-password/ChangePassword';
import { updateUser } from '@/redux/features/auth/authThunk';
import { useSelector } from '@/redux/store';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const { email } = user;

  // useEffect(() => {
  //   if (!email) {
  //     navigate('/profile');
  //   }
  // }, [email, navigate]);

  const [profileImage, setProfileImage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === 'image/jpeg' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/png')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', 'zinotrust');
        image.append('upload_preset', 'wk66xdkq');

        // First save image to cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/zinotrust/image/upload',
          { method: 'post', body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();

        // Save Profile
        const formData = {
          name: profile.name,
          phone: profile.phone,
          bio: profile.bio,
          photo: profileImage ? imageURL : profile.photo,
        };

        const data = await updateUser(formData);
        console.log(data);
        toast.success('User updated');
        navigate('/profile');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className='profile --my2'>
      <Card cardClass={'card --flex-dir-column'}>
        <span className='profile-photo'>
          <img src={user?.photo} alt='profilepic' />
        </span>
        <form className='--form-control --m' onSubmit={saveProfile}>
          <span className='profile-data'>
            <p>
              <label>Name:</label>
              <input
                type='text'
                name='name'
                value={user?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Email:</label>
              <input type='text' name='email' value={user?.email} disabled />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label>Phone:</label>
              <input
                type='text'
                name='phone'
                value={user?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label>Bio:</label>
              <textarea
                name='bio'
                value={user?.bio}
                onChange={handleInputChange}
                cols='30'
                rows='10'
              ></textarea>
            </p>
            <p>
              <label>Photo:</label>
              <input type='file' name='image' onChange={handleImageChange} />
            </p>
            <div>
              <button className='--btn --btn-primary'>Edit Profile</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
}
