import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalContentTypes } from '../../components/sharedComponents/ModalForms'

export interface SliceLang {
  isOpen: boolean
  modalContentType: ModalContentTypes | null
  modalProps: ModalProps | null
}

interface ModalProps {
  modalText: string
  endPoint: string
  sectionId?: string
}

const initialState: SliceLang = {
  isOpen: false,
  modalContentType: null,
  modalProps: null,
}

/******************************************************************************
 *                      Redux store: modal
 ******************************************************************************/

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    //open modal action
    openModal(state) {
      state.isOpen = true
    },

    //close modal action
    closeModal(state) {
      state.isOpen = false
    },

    //chose wich from or info to be viwed in modal
    setModalContentType(state, action: PayloadAction<ModalContentTypes>) {
      state.modalContentType = action.payload
    },

    //set modal props if it necessary
    setModalProps(state, action: PayloadAction<ModalProps>) {
      state.modalProps = action.payload
    },
  },
})
export const { openModal, closeModal, setModalContentType, setModalProps } =
  modalSlice.actions
export default modalSlice.reducer
