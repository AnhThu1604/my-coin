import blockChainType from './types';


const initialState = {
  loading: 0,
  wallet: null,
  detail: null,
  transaction: null,
  history: null
};

export default function userReducer(state = initialState, action) {
  let newState;
  const { type, payload = {} } = action;

  switch (type) {
    case blockChainType.REGISTER_SUCCESS:
      const { pk, address } = payload
      localStorage.setItem('pk', pk);
      newState = Object.assign({}, state, { wallet: address });
      break;
    case blockChainType.DETAIL_SUCCESS:
      newState = Object.assign({}, state, { detail: payload });
      break;
    case blockChainType.SEND_TRANSACTION_SUCCESS:
      newState = Object.assign({}, state, { transaction: payload });
      break;
    case blockChainType.HISTORY_SUCCESS:
      newState = Object.assign({}, state, { history: payload });
      break;

    
    case blockChainType.LOADING_SHOW:
      let newLoading1 = state.loading + 1
      newState = Object.assign({}, state, { loading: newLoading1 < 0 ? 0 : newLoading1 });
      break;
    case blockChainType.LOADING_HIDE:
      let newLoading2 = state.loading - 1
      newState = Object.assign({}, state, { loading: newLoading2 < 0 ? 0 : newLoading2  });
      break;
    default:
      newState = state;
  }
  return newState;
}