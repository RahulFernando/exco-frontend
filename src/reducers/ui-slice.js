import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    open: false,
    success: false,
    message: '',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSnackbar(state, action) {
      state.snackbar.open = action.payload.open;
      state.snackbar.message = action.payload.message;
      if (action.payload.success) {
        state.snackbar.success = action.payload.success;
      }
    },
  },
});

const { actions, reducer } = uiSlice;

export const { setSnackbar } = actions;

export default reducer;
