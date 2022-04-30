import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    open: false,
    success: false,
    message: '',
  },
  dialog: {
    open: false,
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
    setDialog(state, action) {
      state.dialog.open = action.payload;
    },
  },
});

const { actions, reducer } = uiSlice;

export const { setSnackbar, setDialog } = actions;

export default reducer;
