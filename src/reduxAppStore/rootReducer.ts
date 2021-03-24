import { combineReducers } from '@reduxjs/toolkit';
import sections from './reducers/sectionSlice';
import error from './reducers/errorSlice';

const rootReducer = combineReducers({
  sections,
  error,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
