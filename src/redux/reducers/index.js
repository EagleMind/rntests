import {combineReducers} from 'redux';
import {authentication} from './auth';
import {profileDetails} from './tmdb/profile';
const rootReducer = combineReducers({
  auth: authentication,
  profile: profileDetails,
});
export default rootReducer;
