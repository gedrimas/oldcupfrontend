import { combineReducers } from '@reduxjs/toolkit';
import sections from './reducers/sectionSlice';
import error from './reducers/errorSlice';
import contacts from './reducers/contactsSlice';
import language from './reducers/langSlice';

const rootReducer = combineReducers({
  contacts,
  sections,
  error,
  language,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
