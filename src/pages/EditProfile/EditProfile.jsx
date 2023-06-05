import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import { fetchAuth, fetchAuthEdit, fetchRegister } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import styles from './EditProfile.module.scss'
import axios from '../../axios';

export const EditProfile = () => {
  const { id } = useParams();
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
    try {
      const { data }= await axios.patch(`/user/${id}`, values);
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  }

    //   if(isAuth) {
    //     return <Navigate to='/'/>
    //   }


  return (
    <>
    <Paper classes={{ root: styles.root }} elevation={0}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        Save
      </Button>
      </form>
    </Paper>
    <div className="dot" style={{fontSize: 0}}>.</div>
    </>
  );
};