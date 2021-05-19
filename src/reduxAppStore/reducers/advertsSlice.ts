import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Advert } from '../../api/responsesTypes'

export interface SliceAdverts {
  allAdverts: Advert[]
  pending: boolean
}

const initialState: SliceAdverts = {
  allAdverts: [],
  pending: false,
}

/******************************************************************************
 *                      Redux store: Adverts
 ******************************************************************************/

const advertsSlice = createSlice({
  name: 'advertsSlice',
  initialState,
  reducers: {
    //put all adverts into Redux store
    setAllAdverts(state, action: PayloadAction<Advert[]>) {
      state.allAdverts = action.payload
    },
    //pending status action
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload
    },
  },
})
export const { setAllAdverts, setPending } = advertsSlice.actions
export default advertsSlice.reducer
