import axios from 'axios';
import {PROFILE_DETAILS} from '../../types/tmdb/profile';
import store from '../../../../store';
import config from '../../../config';
export const profileDetails = async () => {
  const profile = await axios
    .get(
      `${config.TMDB_URL}/account?api_key=${config.TMDB_API_KEY}&session_id=${config.SESSION_ID}`,
    )
    .catch(err => {
      return err;
    });
  store.dispatch({
    type: PROFILE_DETAILS,
    payload: profile.data,
  });
};
