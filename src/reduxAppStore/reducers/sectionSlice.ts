import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { Sections } from '../../api/responsesTypes'
import Api from '../../api/api'
import parseApiError from '../../api/apiError'
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
export const {
  setSections,
  setPending,
  setActiveSection,
} = sectionSlice.actions
export default sectionSlice.reducer

//fetch data and put into Redux store (into srctions)
export const fetchSections = (): AppThunk => async (dispatch) => {
  try {
    //set up pending true
    dispatch(setPending(true))

    //fetch data
    const {
      data: { allsections: sections },
    } = await new Api<Sections>('get', 'allsections').response

    //put data into Redux store (sections)
    dispatch(setSections(sections))

    //set up pending false
    dispatch(setPending(false))
  } catch (error) {
    //set up pending false
    dispatch(setPending(false))

    //parse Error message
    const errorInfo = parseApiError(error)

    //set Error info Redux store (error)
    dispatch(setError(errorInfo))
  }
}
