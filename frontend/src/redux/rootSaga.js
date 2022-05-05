import { all } from 'redux-saga/effects';
import blockChainSaga from '../redux/blockChain/saga'

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    blockChainSaga()
  ]);
}
