import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getReferenceData: {
    loading: false,
    data: [],
    error: null,
  },
};

const referenceSlice = createSlice({
  name: 'reference',
  initialState,
  reducers: {
    fetchReferenceStart(state) {
      state.getReferenceData.loading = true;
    },
    fetchReferenceSuccess(state, action) {
      state.getReferenceData.loading = false;
      state.getReferenceData.data = action.payload;
      state.getReferenceData.error = null;
    },
    fetchReferenceFail(state, action) {
      state.getReferenceData.loading = false;
      state.getReferenceData.data = [];
      state.getReferenceData.error = action.payload;
    },
  },
});

const { actions, reducer } = referenceSlice;

export const {
  fetchReferenceStart,
  fetchReferenceSuccess,
  fetchReferenceFail,
} = actions;

export default reducer;
