import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getLendingsData: {
    loading: false,
    data: [],
    error: null,
  },
};

const lendingSlice = createSlice({
  name: 'lending',
  initialState,
  reducers: {
    fetchLendingStart(state) {
      state.getLendingsData.loading = true;
    },
    fetchLendingSuccess(state, action) {
      state.getLendingsData.loading = false;
      state.getLendingsData.data = action.payload;
      state.getLendingsData.error = null;
    },
    fetchLendingFail(state, action) {
      state.getLendingsData.loading = false;
      state.getLendingsData.data = [];
      state.getLendingsData.error = action.payload;
    },
  },
});

const { actions, reducer } = lendingSlice;

export const { fetchLendingStart, fetchLendingSuccess, fetchLendingFail } =
  actions;

export default reducer;
