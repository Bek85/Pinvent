import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/card/Card';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './profile.scss';
import { toast } from 'react-toastify';
import ChangePassword from '@/components/change-password/ChangePassword';
import { updateUser } from '@/redux/features/auth/authThunk';
import { useSelector } from '@/redux/store';
import InputField from '@/components/product/product-form/InputField';

const productFormSchema = yup.object({
  image: yup.string().required('Image is required').nullable(true),
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email address'),

  bio: yup.string().required('Bio is required'),
});

export default function EditProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [profileImage, setProfileImage] = useState('');

  const defaultValues = useMemo(
    () => ({
      image: user?.photo || '',
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(productFormSchema),
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
      setValue('image', file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className='profile --my2'>
      <Card cardClass={'card --flex-dir-column'}>
        <span className='profile-photo'>
          {/* <img src={user?.photo} alt='profilepic' /> */}
          {profileImage != null ? (
            <img src={user?.photo || profileImage} alt='profilepic' />
          ) : (
            <p>No image set for this product.</p>
          )}
        </span>
        <form className='--form-control --m' onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name='name'
            label='Product Name'
            error={errors}
            register={register}
          />
          <InputField
            name='email'
            label='Email'
            error={errors}
            register={register}
          />
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
            name='image'
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
