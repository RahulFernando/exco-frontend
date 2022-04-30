import { call, put, takeEvery } from 'redux-saga/effects';

// service
import service from '../services/user-service';

// reducers
import * as userActions from '../reducers/user-slice';
import * as uiActions from '../reducers/ui-slice';

function* loginUser({ payload }) {
  try {
    const response = yield call(service.login, payload);

    if (response.status === 200) {
      yield put({
        type: userActions.loginSuccess.type,
        payload: response.data,
      });
    } else {
      yield put({
        type: uiActions.setSnackbar.type,
        payload: { open: true, message: 'Something went wrong!' },
      });
      yield put({
        type: userActions.loginFail.type,
        payload: 'Something went wrong!',
      });
    }
  } catch (error) {
    yield put({
      type: userActions.loginFail.type,
      payload: error.message,
    });
    yield put({
      type: uiActions.setSnackbar.type,
      payload: { open: true, message: 'Invalid credentials' },
    });
  }
}

export default function* watchers() {
  yield takeEvery(userActions.loginStart.type, loginUser);
}
