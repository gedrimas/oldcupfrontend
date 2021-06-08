import { ReactElement } from 'react'
import LoginForm from './LoginForm'
import ContactsInfoForm from './ContactsInfoForm'
import ConfirmDelForm from './ConfirmDelForm'

interface ModalContent {
  loginForm: ReactElement<any, any>
  contactsInfoForm: ReactElement<any, any>
  confirmDelForm: ReactElement<any, any>
}

const modalContent: ModalContent = {
  loginForm: <LoginForm />,
  contactsInfoForm: <ContactsInfoForm />,
  confirmDelForm: <ConfirmDelForm />,
}

export type ModalContentTypes = keyof ModalContent

export default modalContent
