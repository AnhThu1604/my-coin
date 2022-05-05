import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { createLogger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

let middleware = null;
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true,
  });

  middleware = applyMiddleware(sagaMiddleware, logger);
} else {
  middleware = applyMiddleware(sagaMiddleware);
}

// create store
const store = createStore(rootReducer, compose(middleware));

sagaMiddleware.run(rootSaga);

export default store;
