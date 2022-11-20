import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import compineReducers from './reducer/combineReducers';

const store = createStore(compineReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;
