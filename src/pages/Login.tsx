import React from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordValidation } from '../utils/validation';
import { useAppDispatch, useAppSelector } from '../store';
import { loginThunk } from '../store/auth';
import toast from 'react-hot-toast';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().matches(
    passwordValidation.exp,
    passwordValidation.msg
  ),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const isLoading = useAppSelector(state => state.auth.loading);

  const dispatch = useAppDispatch();
  const submitHandler = async (values: FormValues) => {
    const { email, password } = values;
    const loginResult = await dispatch(
      loginThunk({
        email,
        password,
      })
    );

    if (loginThunk.rejected.match(loginResult)) {
      toast.error('Incorrect email or passowrd');
    }
    if (loginThunk.fulfilled.match(loginResult)) {
      toast.success('Login Success');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        {isLoading && <CircularProgress />}
        <TextField
          label="Email"
          {...register('email')}
          error={errors?.email?.message ? true : false}
          helperText={errors?.email?.message}
        />
        <TextField
          label="Password"
          {...register('password')}
          error={errors?.password?.message ? true : false}
          helperText={errors?.password?.message}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
