import { createSlice } from '@reduxjs/toolkit';

export type Lang = 'ru' | 'ee';
export const ruLang = 'ru';
export const eeLang = 'ee';

export interface SliceLang {
  lang: Lang;
}

const initialState: SliceLang = {
  lang: 'ru',
};

/******************************************************************************
 *                      Redux store: lang
 ******************************************************************************/

const langSlice = createSlice({
  name: 'langSlice',
  initialState,
  reducers: {
    //change language action
    changeLang(state) {
      state.lang = state.lang === 'ru' ? eeLang : ruLang;
    },
  },
});
export const { changeLang } = langSlice.actions;
export default langSlice.reducer;
