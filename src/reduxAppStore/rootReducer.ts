import { combineReducers } from '@reduxjs/toolkit'
import sections from './reducers/sectionSlice'
import error from './reducers/errorSlice'
import contacts from './reducers/contactsSlice'
import language from './reducers/langSlice'
import advertisements from './reducers/advertsSlice'
import modal from './reducers/modalSlice'

const rootReducer = combineReducers({
  contacts,
  sections,
  error,
  language,
  advertisements,
  modal,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
