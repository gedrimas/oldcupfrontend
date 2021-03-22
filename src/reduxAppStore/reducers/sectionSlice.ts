import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';

interface Section {
  id: string;
  ee: string;
  ru: string;
}

type AllSections = Section[];

const initialState: AllSections = [];
const sectionSlice = createSlice({
  name: 'sectionSlice',
  initialState,
  reducers: {
    //create new section
    setSection(state, action: PayloadAction<AllSections>) {
      state = action.payload;
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

export default sectionSlice.reducer;
