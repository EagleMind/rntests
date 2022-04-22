import {combineReducers} from 'redux';
import {authentication} from './auth';
import {profileDetails} from './tmdb/profile';
import {watchingNowState} from './tmdb/watchingnow';
import {upComingNext} from './tmdb/upcoming';
const rootReducer = combineReducers({
  auth: authentication,
  profile: profileDetails,
  watchingNow: watchingNowState,
  upComing: upComingNext,
});
export default rootReducer;
