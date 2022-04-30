import { call, put, takeEvery } from 'redux-saga/effects';

// service
import service from '../services/reference-service';

// reducers
import * as referenceActions from '../reducers/reference-slice';
import * as uiActions from '../reducers/ui-slice';

function* fetchReferences({ payload }) {
  try {
    const response = yield call(service.getReferences);

    if (response.status === 200) {
      yield put({
        type: referenceActions.fetchReferenceSuccess.type,
        payload: response.data,
      });
    } else {
      yield put({
        type: uiActions.setSnackbar.type,
        payload: { open: true, message: 'Something went wrong!' },
      });
      yield put({
        type: referenceActions.fetchReferenceFail.type,
        payload: 'Something went wrong!',
      });
    }
  } catch (error) {
    yield put({
      type: referenceActions.fetchReferenceFail.type,
      payload: error.message,
    });
    yield put({
      type: uiActions.setSnackbar.type,
      payload: { open: true, message: 'Something went wrong!' },
    });
  }
}

export default function* watchers() {
  yield takeEvery(referenceActions.fetchReferenceStart.type, fetchReferences);
}
