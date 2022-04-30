export const lendingDataSelector = (state) =>
  state.lending.getLendingsData.data;

export const lendingLoadingSelector = (state) =>
  state.lending.getLendingsData.loading;
