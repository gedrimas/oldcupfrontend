import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalContentTypes } from '../../components/sharedComponents/ModalForms'

export interface SliceLang {
  isOpen: boolean
  modalContentType: ModalContentTypes | null
}

const initialState: SliceLang = {
  isOpen: false,
  modalContentType: null,
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
  },
})
export const { openModal, closeModal, setModalContentType } = modalSlice.actions
export default modalSlice.reducer
