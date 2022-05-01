import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addCartData: {
    loading: false,
    data: null,
    error: null,
  },
  getCartData: {
    loading: false,
    data: null,
    error: null,
  },
  updateItem: {
    loading: false,
    data: null,
    error: null,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartStart(state) {
      state.addCartData.loading = true;
    },
    addToCartSuccess(state, action) {
      state.addCartData.loading = false;
      state.addCartData.data = action.payload;
      state.addCartData.error = null;
    },
    addToCartFail(state, action) {
      state.addCartData.loading = false;
      state.addCartData.data = null;
      state.addCartData.error = action.payload;
    },
    addToCartReset(state) {
      state.addCartData.loading = initialState.addCartData.loading;
      state.addCartData.data = initialState.addCartData.data;
      state.addCartData.error = initialState.addCartData.error;
    },
    getCartStart(state) {
      state.getCartData.loading = true;
    },
    getCartSuccess(state, action) {
      state.getCartData.loading = false;
      state.getCartData.data = action.payload;
      state.getCartData.error = null;
    },
    getCartFail(state, action) {
      state.getCartData.loading = false;
      state.getCartData.data = null;
      state.getCartData.error = action.payload;
    },
    updateItemStart(state) {
      state.updateItem.loading = true;
    },
    updateItemSuccess(state, action) {
      state.updateItem.loading = false;
      state.updateItem.data = action.payload;
      state.updateItem.error = null;
    },
    updateItemFail(state, action) {
      state.updateItem.loading = false;
      state.updateItem.data = null;
      state.updateItem.error = action.payload;
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  addToCartStart,
  addToCartSuccess,
  addToCartFail,
  addToCartReset,
  getCartStart,
  getCartSuccess,
  getCartFail,
  updateItemStart,
  updateItemSuccess,
  updateItemFail,
} = actions;

export default reducer;
