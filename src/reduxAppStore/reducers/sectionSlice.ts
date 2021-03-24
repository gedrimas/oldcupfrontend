import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { Sections } from '../../api/responsesTypes';
import Api from '../../api/api';

interface SlicseSrctions extends Sections {
  pending: boolean;
}

const initialState: SlicseSrctions = {
  allsections: [],
  pending: false,
};
const sectionSlice = createSlice({
  name: 'sectionSlice',
  initialState,
  reducers: {
    //create new section
    setSections(state, action: PayloadAction<Sections['allsections']>) {
      state.allsections = action.payload;
    },
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload;
    },
    //find section by id and rewrite it
    // editSection(state, action: PayloadAction<Section>) {
    //   const sectionId = action.payload.id
    //   if (sectionId) {
    //     state.forEach((itm, index) => {
    //       if (itm.id === sectionId) {
    //         state.splice(index, 1)
    //       }
    //     })
    //   }
    // }
  },
});
export const { setSections, setPending } = sectionSlice.actions;
export default sectionSlice.reducer;

export const fetchSections = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setPending(true));

    const {
      data: { allsections: sections },
    } = await new Api<Sections>('get', 'allsections').response;

    dispatch(setSections(sections));
    dispatch(setPending(false));
  } catch (error) {
    dispatch(setPending(false));

    const {
      response: {
        data: { error: errMesage },
      },
    } = error;
    console.log('err', errMesage);
  }
};
