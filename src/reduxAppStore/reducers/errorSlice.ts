import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SliceError {
  errorInfo: {
    message: string | null
    endpoint: string | null
    method: string | null
    body?: object
  }
  isError: boolean
}

const initialState: SliceError = {
  errorInfo: {
    message: null,
    endpoint: null,
    method: null,
  },
  isError: false,
}

/******************************************************************************
 *                      Redux store: error
 ******************************************************************************/

const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,
  reducers: {
    //set Error info
    setError(state, action: PayloadAction<SliceError['errorInfo']>) {
      state.errorInfo = action.payload
      state.isError = true
    },
    //drop Error
    clearError(state) {
      state.errorInfo = {
        message: null,
        endpoint: null,
        method: null,
      }
      state.isError = false
    },
  },
})
export type SetError = typeof setError
export const { setError, clearError } = errorSlice.actions
export default errorSlice.reducer
