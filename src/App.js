// App.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Login';
import Feed from './components/Feed';
import { logout } from './features/auth/authSlice';
import { Button, Container } from '@mui/material';
import PostForm from './components/PostForm';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      {isAuthenticated ? (
        <>
        <Button onClick={handleLogout} variant="outlined" color="secondary" sx={{ mt: 2 }}>
      Logout
    </Button>
    <PostForm />
    <Feed />
        </>
      ) : (
        <Login />
      )}
    </Container>
  );
};

export default App;
