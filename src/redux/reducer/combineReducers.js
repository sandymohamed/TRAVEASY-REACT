import { combineReducers } from 'redux';

import AuthReducer from './auth';
import MessageReducer from './message';
// combination of reducers
export default combineReducers({
  // signReducer,
  AuthReducer,
  MessageReducer,
});
