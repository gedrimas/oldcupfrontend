import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import Api, { apiRespType } from '../../../api/api'
import { closeModal } from '../../../reduxAppStore/reducers/modalSlice'
import { RootState } from '../../../reduxAppStore/rootReducer'
import { fetchContacts } from '../../../reduxAppStore/reducers/contactsSlice'

interface FormFilds {
  email?: string
  phone?: string
  ee?: string
  ru?: string
  _id?: string
}

const ContactsInfoForm: React.FC = () => {
  //get current contacts and info from Redux store
  const currentContactsInfo = useSelector(
    (sate: RootState) => sate.contacts.contacts,
  )
  const { email, phone, ee, ru, _id } = currentContactsInfo[0]

  //set current contacts & info data to components local state
  const [contactsInfo, setContactsInfo] = useState<FormFilds>({
    email,
    phone,
    ee,
    ru,
    _id,
  })

  const dispatch = useDispatch()

  //set user input to component state
  const handleChange = (val: FormFilds) => {
    setContactsInfo({ ...contactsInfo, ...val })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      // send request to update contacts & info
      const response = await new Api(
        'put',
        '/contacts',
        contactsInfo,
      ).sendRequest()

      //if response error
      if (!apiRespType(response)) {
        throw response
      }

      //close login moadl
      dispatch(closeModal())
      dispatch(fetchContacts())
    } catch (error) {
      //highlight input fields as error
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <h4>Contacts & Info</h4>
        <TextField
          label="Phone"
          value={contactsInfo.phone}
          onChange={(event) => handleChange({ phone: event.target.value })}
        />
        <TextField
          style={{ marginTop: '0.5rem' }}
          label="Email"
          value={contactsInfo.email}
          onChange={(event) => handleChange({ email: event.target.value })}
        />
        <TextField
          style={{ marginTop: '0.5rem' }}
          label="info(Ru)"
          value={contactsInfo.ru}
          onChange={(event) => handleChange({ ru: event.target.value })}
        />
        <TextField
          style={{ marginTop: '0.5rem' }}
          label="info(Ee)"
          value={contactsInfo.ee}
          onChange={(event) => handleChange({ ee: event.target.value })}
        />
        <ButtonGroup size="small" style={{ marginTop: '1rem' }}>
          <Button type="submit">Ok</Button>
          <Button onClick={() => dispatch(closeModal())}>Close</Button>
        </ButtonGroup>
      </Grid>
    </form>
  )
}

export default ContactsInfoForm
