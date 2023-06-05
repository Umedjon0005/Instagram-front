import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const [search, setSearch]=React.useState('')
  const isAuth = useSelector(selectIsAuth);
  const data = useSelector(state => state.auth.data);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if(window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <img src="https://my-first-instagram.netlify.app/images/Instagram_Logo_2016.png" alt="" />
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to={`/userPage/${data._id}`}>
                  <Button variant="text">My Profile</Button>
                </Link>
                <Link to="/add-post">
                  <Button variant="contained">Make post</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
