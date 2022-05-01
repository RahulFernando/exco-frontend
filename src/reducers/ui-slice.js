import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  snackbar: {
    open: false,
    success: false,
    message: '',
  },
  dialog: {
    open: false,
    type: 'LOGIN',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSnackbar(state, action) {
      const success = action.payload.success ? action.payload.success : false;
      state.snackbar.open = action.payload.open;
      state.snackbar.message = action.payload.message;
      state.snackbar.success = success;
    },
    setDialog(state, action) {
      state.dialog.open = action.payload.open;
      if (action.payload.type) {
        state.dialog.type = action.payload.type;
      }
    },
  },
});

const { actions, reducer } = uiSlice;

export const { setSnackbar, setDialog } = actions;

export default reducer;
