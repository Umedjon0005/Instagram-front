import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { fetchAuth, fetchRegister } from '../../redux/slices/auth';
import styles from './Register.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if(!data.payload) {
      return alert('Can not register!');
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Can not register!')
    }
  }

      if(isAuth) {
        return <Navigate to='/'/>
      }


  return (
    <div>
    <Paper classes={{ root: styles.root }} elevation={0}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create your account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} 
         
        />
      </div>
      <TextField error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          type='text'
          {...register('fullName', {required: 'fullName'})} className={styles.field} label="Полное имя" fullWidth />
      <TextField error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', {required: 'email'})} className={styles.field} label="E-Mail" fullWidth />
      <TextField error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', {required: 'password'})} className={styles.field} label="Пароль" fullWidth />
      <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
        Register
      </Button>
      </form>
    </Paper>
    <div style={{fontSize: 10}}>.</div>
    </div>
  );
};
