import axios from 'axios';
import {UP_COMING} from '../../types/tmdb/upcoming';
import config from '../../../config';
export function upcomingNow() {
  return async dispatch => {
    await axios
      .get(
        `${config.TMDB_URL}/movie/upcoming?api_key=${config.TMDB_API_KEY}&session_id=${config.SESSION_ID}`,
      )
      .then(res => {
        dispatch({
          type: UP_COMING,
          payload: res.data.results,
        });
      })
      .catch(err => {
        return err;
      });
  };
}
