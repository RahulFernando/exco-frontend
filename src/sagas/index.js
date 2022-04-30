import { fork } from 'redux-saga/effects';

// sagas
import lendingSaga from './lending-saga';

export default function* rootSaga() {
    yield fork(lendingSaga)
}