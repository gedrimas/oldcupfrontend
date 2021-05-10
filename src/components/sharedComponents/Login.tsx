import React from 'react'
import Grid from '@material-ui/core/Grid'
import '../../styles/App.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

interface LoginOut {
  login: () => void
}

const Login: React.FC<LoginOut> = ({ login }) => {
  return (
    <Grid item id="loginIcon" onClick={login}>
      <AccountCircleIcon fontSize="large" style={{ cursor: 'pointer' }} />
    </Grid>
  )
}

export default Login
