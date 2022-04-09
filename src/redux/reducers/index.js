import {combineReducers} from 'redux';
import {authentication} from './auth';
import {profileDetails} from './tmdb/profile';
import {watchingNowFeature} from './tmdb/features';
const rootReducer = combineReducers({
  auth: authentication,
  profile: profileDetails,
  watchingNowFeature: watchingNowFeature,
});
export default rootReducer;
