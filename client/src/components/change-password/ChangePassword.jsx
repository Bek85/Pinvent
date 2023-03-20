import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './ChangePassword.scss';
import { toast } from 'react-toastify';
import Card from '../card/Card';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '@/redux/features/auth/authThunk';
import { dispatch, useSelector } from '@/redux/store';
import { useMemo } from 'react';
import InputField from '@/components/product/product-form/InputField';

const ChangePasswordSchema = yup.object({
  oldPassword: yup.string().required('Previous password is required'),
  password: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export default function ChangePassword() {
  const navigate = useNavigate();
  const { changePasswordStatus, errorMessage } = useSelector(
    (state) => state.auth
  );

  const defaultValues = useMemo(
    () => ({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
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

  const onSubmit = async (data) => {
    const { oldPassword, password } = data;
    const res = await dispatch(changePassword({ oldPassword, password }));
    if (changePasswordStatus === 'SUCCESS') {
      toast.success(res);
      navigate('/profile');
    } else {
      toast.error(errorMessage);
    }
  };

  return (
    <div className='change-password'>
      <Card cardClass={'password-card'}>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='--form-control'>
          <InputField
            type='password'
            name='oldPassword'
            label='Old Password'
            error={errors}
            register={register}
          />
          <InputField
            type='password'
            name='password'
            label='New Password'
            error={errors}
            register={register}
          />
          <InputField
            type='password'
            name='confirmPassword'
            label='Confirm New Password'
            error={errors}
            register={register}
          />

          <button type='submit' className='--btn --btn-primary'>
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
}
