import { combineReducers } from '@reduxjs/toolkit';
import sections from './reducers/sectionSlice';

const rootReducer = combineReducers({
  sections,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
