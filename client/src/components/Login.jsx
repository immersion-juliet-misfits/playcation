import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  return (
    <>
      <h1>Plan your vacation with Playcation</h1>
      <form action="/auth/google" method="GET">
        <Button variant="outlined" type="submit"><GoogleIcon /></Button>
      </form>
    </>
  )
};

export default Login;