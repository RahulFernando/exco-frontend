import { call, put, takeEvery } from 'redux-saga/effects';

// service
import service from '../services/cart-service';

// reducers
import * as cartActions from '../reducers/cart-slice';
import * as uiActions from '../reducers/ui-slice';

function* addToCart({ payload }) {
  try {
    const response = yield call(service.postCart, payload);

    if (response.status === 200) {
      yield put({
        type: cartActions.addToCartSuccess.type,
        payload: response.data,
      });
      yield put({
        type: uiActions.setSnackbar.type,
        payload: { open: true, success: true, message: 'Book added!' },
      });
    } else {
      yield put({
        type: uiActions.setSnackbar.type,
        payload: { open: true, message: 'Something went wrong!' },
      });
      yield put({
        type: cartActions.addToCartFail.type,
        payload: 'Something went wrong!',
      });
    }
  } catch (error) {
    yield put({
      type: cartActions.addToCartFail.type,
      payload: error.message,
    });
  }
}

function* getCart({ payload }) {
  try {
    const response = yield call(service.getCart, payload);

    if (response.status === 200) {
      yield put({
        type: cartActions.getCartSuccess,
        payload: response.data,
      });
    } else {
      yield put({
        type: uiActions.setSnackbar.type,
        payload: { open: true, message: 'Something went wrong!' },
      });
      yield put({
        type: cartActions.getCartFail.type,
        payload: 'Something went wrong!',
      });
    }
  } catch (error) {
    yield put({
      type: cartActions.getCartFail.type,
      payload: error.message,
    });
    yield put({
      type: uiActions.setSnackbar.type,
      payload: { open: true, message: 'Invalid credentials' },
    });
  }
}

export default function* watchers() {
  yield takeEvery(cartActions.addToCartStart.type, addToCart);
  yield takeEvery(cartActions.getCartStart.type, getCart);
}
