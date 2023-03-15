import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/card/Card';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './profile.scss';
import { toast } from 'react-toastify';
import ChangePassword from '@/components/change-password/ChangePassword';
import { updateUser } from '@/redux/features/auth/authThunk';
import { dispatch, useSelector } from '@/redux/store';
import InputField from '@/components/product/product-form/InputField';
import Spinner from '@/components/spinner/Spinner';

const UserSchema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required'),
  bio: yup.string().required('Bio is required'),
});

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUserStatus } = useSelector((state) => state.auth);

  const [profileImage, setProfileImage] = useState('');

  const defaultValues = useMemo(
    () => ({
      photo: user?.photo || '',
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    modules,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onFileChange = (evt) => {
    const file = evt.target.files[0];
    const newFile = URL.createObjectURL(file);
    setProfileImage(newFile);

    if (file) {
      setValue('photo', file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    const { bio, email, name, phone, photo } = data;

    let imageUrl;
    if (profileImage) {
      const image = new FormData();
      image.append('file', photo);
      image.append('cloud_name', 'dv3k4vpjc');
      image.append('upload_preset', 'tckaevpf');

      // First save image to cloudinary
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dv3k4vpjc/image/upload',
        { method: 'post', body: image }
      );
      const imgData = await response.json();
      imageUrl = imgData.url.toString();
    }
    const formData = {
      name,
      phone,
      email,
      bio,
      photo: profileImage ? imageUrl : photo,
    };

    await dispatch(updateUser(formData));
    toast.success('User details updated');
    navigate('/profile');
  };

  return (
    <div className='profile --my2'>
      {updateUserStatus === 'PENDING' && <Spinner />}
      <Card cardClass={'card --flex-dir-column'}>
        <span className='profile-photo'>
          <img src={profileImage || user?.photo} alt='profilepic' />
        </span>
        <form className='--form-control --m' onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name='name'
            label='User name'
            error={errors}
            register={register}
          />
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' value={user?.email} disabled />
          <InputField
            name='phone'
            label='Phone'
            error={errors}
            register={register}
          />
          <textarea
            name='bio'
            label='Bio'
            cols='30'
            rows='10'
            {...register('bio')}
          />
          <span className='error'>{errors.bio?.message}</span>
          <input
            type='file'
            name='photo'
            placeholder='Image'
            onChange={onFileChange}
          />

          <div>
            <button className='--btn --btn-primary'>Update Profile</button>
          </div>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
}
