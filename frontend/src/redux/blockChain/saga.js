import { takeEvery, all, put, call } from 'redux-saga/effects';
import blockChainType from './types';
import httpBlockChain from '../../api/apiBlockChain' 

export default function* userSaga() {
  yield all([
    register(),
    getDetail(),
    sendTransaction(),
    getHistory(),

  ]);
}

function* register() {
  yield takeEvery(blockChainType.REGISTER, function*() {
    try {
      let res = yield call(httpBlockChain.createWallet, {}); 
      yield put({ type: blockChainType.REGISTER_SUCCESS, payload: res});
    } catch (e) { console.log(e) }
  });
}

function* getDetail() {
  yield takeEvery(blockChainType.DETAIL, function*({ payload }) {
    try {
      let res = yield call(httpBlockChain.getDetail, payload); 
      yield put({ type: blockChainType.DETAIL_SUCCESS, payload: res});
    } catch (e) { console.log(e) }
  });
}

function* sendTransaction() {
  yield takeEvery(blockChainType.SEND_TRANSACTION, function*({ payload }) {
    try {
      let res = yield call(httpBlockChain.sendTransaction, payload); 
      yield put({ type: blockChainType.SEND_TRANSACTION_SUCCESS, payload: res});
    } catch (e) { console.log(e) }
  });
}

function* getHistory() {
  yield takeEvery(blockChainType.HISTORY, function*({ payload }) {
    try {
      let res = yield call(httpBlockChain.getHistory, payload);
      yield put({ type: blockChainType.HISTORY_SUCCESS, payload: res});
    } catch (e) { console.log(e) }
  });
}



