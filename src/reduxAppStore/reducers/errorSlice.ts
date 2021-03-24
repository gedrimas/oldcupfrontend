import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SliceError {
  message: string | null;
  status: number | null;
  endpoint: string | null;
}

const initialState: SliceError = {
  message: null,
  status: null,
  endpoint: null,
};
const errorSlice = createSlice({
  name: 'errorSlice',
  initialState,
  reducers: {
    //set Error info
    setError(state, action: PayloadAction<SliceError>) {
      state = action.payload;
    },
    clearError(state) {
      state = {
        message: null,
        status: null,
        endpoint: null,
      };
    },
  },
});
export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
