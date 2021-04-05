import React from 'react';
import Grid from '@material-ui/core/Grid';
import '../../styles/App.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Login: React.FC = () => {
  return (
    <Grid item id="loginIcon">
      <AccountCircleIcon fontSize="large" />
    </Grid>
  );
};

export default Login;
