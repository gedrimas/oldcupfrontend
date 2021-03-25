import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SliceError {
  errorInfo: {
    message: string | null;
    endpoint: string | null;
    method: string | null;
  };
}

const initialState: SliceError = {
  errorInfo: {
    message: null,
    endpoint: null,
    method: null,
  },
};
const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,
  reducers: {
    //set Error info
    setError(state, action: PayloadAction<SliceError['errorInfo']>) {
      console.log('setError', action.payload);

      state.errorInfo = action.payload;
    },
    clearError(state) {
      state.errorInfo = {
        message: null,
        endpoint: null,
        method: null,
      };
    },
  },
});
export type SetError = typeof setError;
export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
