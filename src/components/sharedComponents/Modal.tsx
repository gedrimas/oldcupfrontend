import { ReactElement } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../reduxAppStore/reducers/modalSlice'
import Grid from '@material-ui/core/Grid'
import modalContent from './ModalForms'
import { RootState } from '../../reduxAppStore/rootReducer'

export interface SimpleDialogProps {
  open: boolean
}

export default function Modal(prop: SimpleDialogProps) {
  const { open } = prop
  const dispatch = useDispatch()

  const contentType = useSelector(
    (state: RootState) => state.modal.modalContentType,
  )

  let content!: ReactElement<any, any>

  //chose content for modal
  if (contentType) content = modalContent[contentType]

  //close modal
  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Grid container justify="center" style={{ padding: '1rem' }}>
        {content}
      </Grid>
    </Dialog>
  )
}
