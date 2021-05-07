import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Advert, Adverts, NullbleT } from '../../api/responsesTypes'

type NullbleAdvert = NullbleT<Advert>

export interface SliceAdverts {
  allAdverts: Advert[]
}

const initialState: SliceAdverts = {
  allAdverts: [],
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
  },
})
export const { setAllAdverts } = advertsSlice.actions
export default advertsSlice.reducer
