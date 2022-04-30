import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// reducers
import createReducer from '../reducers';

// sagas
import rootSaga from '../sagas';

const appReducer = combineReducers(createReducer);

export default function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: appReducer,
    middleware: [...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
  });

  runSaga(rootSaga);

  return store;
}
