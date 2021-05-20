import { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import Api, { apiRespType } from '../../../api/api'
import { closeModal } from '../../../reduxAppStore/reducers/modalSlice'

interface FormFilds {
  name?: string
  password?: string
}

const LoginForm: React.FC = () => {
  const [namePass, setNamePass] = useState<FormFilds>({
    name: '',
    password: '',
  })
  const [loginError, setLoginError] = useState(false)

  const dispatch = useDispatch()

  //set user input to component state
  const handleChange = (val: FormFilds) => {
    setNamePass({ ...namePass, ...val })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      // send login request
      const response = await new Api('post', 'login', namePass).sendRequest()

      //if response error
      if (!apiRespType(response)) {
        throw response
      }

      dispatch(closeModal())
    } catch (error) {
      setLoginError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <h4>Stuff only</h4>
        <TextField
          error={loginError}
          label="Login"
          value={namePass.name}
          onChange={(event) => handleChange({ name: event.target.value })}
        />
        <TextField
          error={loginError}
          style={{ marginTop: '0.5rem' }}
          label="Password"
          type="password"
          value={namePass.password}
          onChange={(event) => handleChange({ password: event.target.value })}
        />
        <ButtonGroup size="small" style={{ marginTop: '1rem' }}>
          <Button type="submit">Ok</Button>
          <Button onClick={() => dispatch(closeModal())}>Close</Button>
        </ButtonGroup>
      </Grid>
    </form>
  )
}

export default LoginForm
