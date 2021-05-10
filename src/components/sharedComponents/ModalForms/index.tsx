import { ReactElement } from 'react'
import LoginForm from './LoginForm'

interface ModalContent {
  loginForm: ReactElement<any, any>
}

const modalContent: ModalContent = {
  loginForm: <LoginForm />,
}

export type ModalContentTypes = keyof ModalContent

export default modalContent
