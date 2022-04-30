import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginData: {
    loading: false,
    data: null,
    error: null,
  },
};

const referenceSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loginData.loading = true;
    },
    loginSuccess(state, actions) {
      state.loginData.loading = false;
      state.loginData.data = actions.payload;
      state.loginData.error = null;
    },
    loginFail(state, actions) {
      state.loginData.loading = false;
      state.loginData.data = null;
      state.loginData.error = actions.payload;
    },
    loginReset(state) {
      state.loginData = initialState.loginData;
    },
  },
});

const { actions, reducer } = referenceSlice;

export const { loginStart, loginSuccess, loginFail, loginReset } = actions;

export default reducer;
