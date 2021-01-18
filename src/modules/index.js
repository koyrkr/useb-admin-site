import { combineReducers } from 'redux';
import notiReducer from './notification';
import logReducer from './log';
import storeReducer from './store';

const rootReducer = combineReducers({
  notiReducer,
  logReducer,
  storeReducer
});

export default rootReducer;
