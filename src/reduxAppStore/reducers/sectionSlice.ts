import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { Sections } from '../../api/responsesTypes'
import Api, { apiRespType } from '../../api/api'
import { setError } from './errorSlice'

interface SlicseSrctions extends Sections {
  pending: boolean
  activeSection: string
}

const initialState: SlicseSrctions = {
  allsections: [],
  pending: false,
  activeSection: '',
}

/******************************************************************************
 *                      Redux store: sections
 ******************************************************************************/

const sectionSlice = createSlice({
  name: 'sectionSlice',
  initialState,
  reducers: {
    //set sections action
    setSections(state, action: PayloadAction<Sections['allsections']>) {
      state.allsections = action.payload
    },
    //pending status action
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload
    },
    //set active section
    setActiveSection(state, action: PayloadAction<string>) {
      state.activeSection = action.payload
    },
  },
})
export const { setSections, setPending, setActiveSection } =
  sectionSlice.actions
export default sectionSlice.reducer

//fetch data and put into Redux store (into srctions)
export const fetchSections = (): AppThunk => async (dispatch) => {
  try {
    //set up pending true
    dispatch(setPending(true))

    //fetch data
    const response = await new Api<Sections>('get', 'allsections').sendRequest()

    //if response error
    if (!apiRespType(response)) {
      throw response
    }

    //get sections from response
    const {
      data: { allsections: sections },
    } = response

    //put data into Redux store (sections)
    dispatch(setSections(sections))
  } catch (error) {
    //set Error info Redux store (error)
    dispatch(setError(error))
  } finally {
    //set up pending false
    dispatch(setPending(false))
  }
}
