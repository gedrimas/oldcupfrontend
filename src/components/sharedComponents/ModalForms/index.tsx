import { ReactElement } from 'react'
import LoginForm from './LoginForm'
import ContactsInfoForm from './ContactsInfoForm'

interface ModalContent {
  loginForm: ReactElement<any, any>
  contactsInfoForm: ReactElement<any, any>
}

const modalContent: ModalContent = {
  loginForm: <LoginForm />,
  contactsInfoForm: <ContactsInfoForm />,
}

export type ModalContentTypes = keyof ModalContent

export default modalContent
