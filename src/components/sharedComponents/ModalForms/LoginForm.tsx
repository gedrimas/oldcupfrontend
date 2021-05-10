import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'

interface FormFilds {
  name?: string
  pass?: string
}

const LoginForm: React.FC = () => {
  const [namePass, setNamePass] = useState<FormFilds>({ name: '', pass: '' })

  //set user input to component state
  const handleChange = (val: FormFilds) => {
    setNamePass({ ...namePass, ...val })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log('namePass', namePass)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <h4>Stuff only</h4>
        <TextField
          label="Login"
          value={namePass.name}
          onChange={(event) => handleChange({ name: event.target.value })}
        />
        <TextField
          style={{ marginTop: '0.5rem' }}
          label="Password"
          type="password"
          value={namePass.pass}
          onChange={(event) => handleChange({ pass: event.target.value })}
        />
        <ButtonGroup size="small" style={{ marginTop: '1rem' }}>
          <Button type="submit">Ok</Button>
          <Button>Close</Button>
        </ButtonGroup>
      </Grid>
    </form>
  )
}

export default LoginForm
