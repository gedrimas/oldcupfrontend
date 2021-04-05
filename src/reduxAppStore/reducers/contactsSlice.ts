import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { Contacts } from '../../api/responsesTypes';
import Api from '../../api/api';
import parseApiError from '../../api/apiError';
import { setError } from './errorSlice';

interface SlicseContacts extends Contacts {
  pending: boolean;
}

const initialState: SlicseContacts = {
  contacts: [],
  pending: false,
};

/******************************************************************************
 *                      Redux store: contacts
 ******************************************************************************/

const contactSlice = createSlice({
  name: 'contactSlice',
  initialState,
  reducers: {
    //set contacts action
    setContacts(state, action: PayloadAction<Contacts['contacts']>) {
      state.contacts = action.payload;
    },
    //pending status action
    setPending(state, action: PayloadAction<boolean>) {
      state.pending = action.payload;
    },
  },
});
export const { setContacts, setPending } = contactSlice.actions;
export default contactSlice.reducer;

//fetch data and put into Redux store (into contacts)
export const fetchContacts = (): AppThunk => async (dispatch) => {
  try {
    //set up pending true
    dispatch(setPending(true));

    //fetch data
    const {
      data: { contacts: contact },
    } = await new Api<Contacts>('get', 'contacts').response;

    //put data into Redux store
    dispatch(setContacts(contact));

    //set up pending false
    dispatch(setPending(false));
  } catch (error) {
    //set up pending false
    dispatch(setPending(false));

    //parse Error message
    const errorInfo = parseApiError(error);

    //set Error info Redux store (error)
    dispatch(setError(errorInfo));
  }
};
