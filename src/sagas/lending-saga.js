import { call, put, takeEvery } from 'redux-saga/effects';

// service
import service from '../services/lending-service';

// reducers
import * as lendingActions from '../reducers/lending-slice';
import * as uiActions from '../reducers/ui-slice';

function* fetchLendings({ payload }) {
  try {
    const response = yield call(service.getLendings);

    if (response.status === 200) {
      yield put({
        type: lendingActions.fetchLendingSuccess.type,
        payload: response.data,
      });
    } else {
      yield put({
        type: uiActions.setSnackbar.type,
        payload: { open: true, message: 'Something went wrong!' },
      });
      yield put({
        type: lendingActions.fetchLendingFail.type,
        payload: 'Something went wrong!',
      });
    }
  } catch (error) {
    yield put({
      type: lendingActions.fetchLendingFail.type,
      payload: error.message,
    });
    yield put({
      type: uiActions.setSnackbar.type,
      payload: { open: true, message: 'Something went wrong!' },
    });
  }
}

export default function* watchers() {
  yield takeEvery(lendingActions.fetchLendingStart.type, fetchLendings);
}
