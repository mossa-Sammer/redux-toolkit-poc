import { Button, TextField } from '@mui/material';
import React from 'react';

import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../store';
import { signupThunk } from '../store/auth';
import { passwordValidation } from '../utils/validation';
import toast from 'react-hot-toast';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().matches(
    passwordValidation.exp,
    passwordValidation.msg
  ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();

  const submitHandler = async (values: FormValues) => {
    const { name, password, email } = values;
    const result = await dispatch(
      signupThunk({
        name,
        email,
        password,
      })
    );

    if (signupThunk.rejected.match(result)) {
      if (result.payload?.msg) {
        toast.error(result.payload.msg);
      }
    }
    if (signupThunk.fulfilled.match(result)) {
      toast.success('Signup success');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <TextField
          error={errors.name?.message ? true : false}
          helperText={errors?.name?.message}
          label="Name"
          {...register('name')}
        />

        <TextField
          error={errors.email?.message ? true : false}
          helperText={errors?.email?.message}
          type="email"
          label="Email"
          {...register('email')}
        />
        <TextField
          error={errors.password?.message ? true : false}
          helperText={errors?.password?.message}
          label="Password"
          {...register('password')}
        />
        <TextField
          error={errors.confirmPassword?.message ? true : false}
          helperText={errors?.confirmPassword?.message}
          label="Confirm Password"
          {...register('confirmPassword')}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
