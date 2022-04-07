import {combineReducers} from 'redux';
import {authentication} from './auth';

const rootReducer = combineReducers({
  auth: authentication,
});
export default rootReducer;
