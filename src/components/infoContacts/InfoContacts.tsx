import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import { fetchContacts } from '../../reduxAppStore/reducers/contactsSlice'
import { RootState } from '../../reduxAppStore/rootReducer'
import '../../styles/App.css'
import Login from '../sharedComponents/Login'
import LangSwicher from '../sharedComponents/LangSwicher'
import Modal from '../sharedComponents/Modal'
import {
  openModal,
  setModalContentType,
} from '../../reduxAppStore/reducers/modalSlice'
import EditIcon from '@material-ui/icons/Edit'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Api, { apiRespType } from '../../api/api'
import { dropLogin } from '../../reduxAppStore/reducers/loginSlice'
//import {materialCustomStyles} from '@styles/'
import useStyles from '../../styles/materialCustomStyles'

const InfoContacts: React.FC = () => {
  const dispatch = useDispatch()

  //fetch data for InfoContacts component
  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  //get contacts from Redux store
  const contacts = useSelector((state: RootState) => state.contacts.contacts)

  //get current language from Redux store
  const currentLanguage = useSelector((state: RootState) => state.language.lang)

  const parseDataForHeader = () => {
    if (contacts.length) {
      return {
        //get info according current language
        info: contacts[0][currentLanguage],
        phone: contacts[0].phone,
        email: contacts[0].email,
      }
    }
    return null
  }

  //data for header
  const infoContacts = parseDataForHeader()

  //get modal status
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)

  //open login modal and set content type for modal
  function loginAsAdmin() {
    dispatch(setModalContentType('loginForm'))
    dispatch(openModal())
  }

  //open contacts & info editing modal
  function editContacts() {
    dispatch(setModalContentType('contactsInfoForm'))
    dispatch(openModal())
  }

  //chek isLogin
  const isLogin = useSelector((state: RootState) => state.login.isLogin)

  //logout
  const logOut = async () => {
    try {
      // send login request
      const response = await new Api('get', '/logout').sendRequest()

      //if response error
      if (!apiRespType(response)) {
        throw response
      }

      //set login false
      dispatch(dropLogin())
    } catch (error) {
      //highlight input fields as error
    }
  }

  const classes = useStyles()

  return (
    <div className="InfoContact-wrapper">
      <Modal open={isModalOpen} />
      <Grid container justify="space-between" wrap="nowrap">
        <LangSwicher />
        <Grid container alignItems="center" justify="center">
          <span style={{ textAlign: 'center' }}>{infoContacts?.info}</span>
        </Grid>
        {isLogin ? (
          <ExitToAppIcon
            fontSize="large"
            style={{ cursor: 'pointer' }}
            onClick={logOut}
          />
        ) : (
          <Login login={loginAsAdmin} />
        )}
      </Grid>
      <Grid container justify="center">
        <Grid item>
          <Grid container>
            <PhoneIcon />
            <span>{infoContacts?.phone}</span>
          </Grid>
        </Grid>
        <Grid item style={{ marginLeft: '0.5rem' }}>
          <Grid container>
            <EmailIcon style={{ marginRight: '0.2rem' }} />
            <span>{infoContacts?.email}</span>
            {isLogin && (
              <EditIcon
                className={`${classes.customIcon}`}
                onClick={editContacts}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default InfoContacts
