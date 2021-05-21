import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SliceLogin {
  isLogin: boolean
}

const initialState: SliceLogin = {
  isLogin: false,
}

/******************************************************************************
 *                      Redux store: login
 ******************************************************************************/

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    //set login
    setLogin(state) {
      state.isLogin = true
    },
    //drop login
    dropLogin(state) {
      state.isLogin = false
    },
  },
})

export const { setLogin, dropLogin } = loginSlice.actions
export default loginSlice.reducer
