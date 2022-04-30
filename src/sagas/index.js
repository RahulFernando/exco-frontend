import { fork } from 'redux-saga/effects';

// sagas
import lendingSaga from './lending-saga';
import referenceSaga from './reference-saga';
import userSaga from './user-saga';

export default function* rootSaga() {
  yield fork(lendingSaga);
  yield fork(referenceSaga);
  yield fork(userSaga);
}
