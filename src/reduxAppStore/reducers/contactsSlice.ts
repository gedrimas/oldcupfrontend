import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { Contacts } from '../../api/responsesTypes';
import Api from '../../api/api';

interface SlicseContacts extends Contacts {
  pending: boolean;
}

const initialState: SlicseContacts = {
  contacts: [],
  pending: false,
};
const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contacts['contacts']>) {
      state.contacts = action.payload;
    },
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload;
    },
  },
});
export const { setContacts, setPending } = contactSlice.actions;
export default contactSlice.reducer;

export const fetchContacts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setPending(true));

    const {
      data: { contacts: contact },
    } = await new Api<Contacts>('get', 'contacts').response;

    dispatch(setContacts(contact));
    dispatch(setPending(false));
  } catch (error) {
    dispatch(setPending(false));
    console.log('ER', error);
    console.log('ERRTTYPE', typeof error);
    if (error.response) {
      const {
        response: {
          data: { error: errMesage },
        },
      } = error;
      console.log('err', errMesage);
    }
  }
};
