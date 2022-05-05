import { combineReducers } from 'redux';
import { filterActions } from 'redux-ignore';

import blockchainReducer from './blockChain/reducer';
import blockchainType from './blockChain/types';

const rootReducer = combineReducers({
  blockchain: filterActions(blockchainReducer, Object.values(blockchainType))
});

export default rootReducer;
