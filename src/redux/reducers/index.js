import {combineReducers} from 'redux';
import {authentication} from './auth';
import {profileDetails} from './profile';
const rootReducer = combineReducers({
  auth: authentication,
  profile: profileDetails,
});
export default rootReducer;
