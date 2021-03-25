import { combineReducers } from '@reduxjs/toolkit';
import sections from './reducers/sectionSlice';
import error from './reducers/errorSlice';
import contacts from './reducers/contactsSlice';

const rootReducer = combineReducers({
  contacts,
  sections,
  error,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
