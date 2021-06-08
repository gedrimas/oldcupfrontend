import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import Api, { apiRespType } from '../../../api/api'
import { closeModal } from '../../../reduxAppStore/reducers/modalSlice'
import { RootState } from '../../../reduxAppStore/rootReducer'
import { setError } from '../../../reduxAppStore/reducers/errorSlice'

const ConfirmDelForm: React.FC = () => {
  const dispatch = useDispatch()

  const modalProps = useSelector((state: RootState) => state.modal.modalProps)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      //if endPoint or sectionId havn't set don't send request
      if (!(modalProps?.endPoint && modalProps?.sectionId)) return

      const { endPoint, sectionId } = modalProps

      // send request to delete the section and all related advertisments
      const response = await new Api(
        'delete',
        `${endPoint}/${sectionId}`,
      ).sendRequest()

      //if response error
      if (!apiRespType(response)) {
        throw response
      }

      //close login moadl
      dispatch(closeModal())
    } catch (error) {
      dispatch(setError(error))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center">
        <h4>{modalProps?.modalText}</h4>
        <ButtonGroup size="small" style={{ marginTop: '1rem' }}>
          <Button type="submit">Ok</Button>
          <Button onClick={() => dispatch(closeModal())}>Close</Button>
        </ButtonGroup>
      </Grid>
    </form>
  )
}

export default ConfirmDelForm
