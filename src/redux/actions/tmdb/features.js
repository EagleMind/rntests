import axios from 'axios';
import {WATCHING_NOW} from '../../types/tmdb/features';
import config from '../../../config';
export function watchingNow() {
  return dispatch => {
    axios
      .get(
        `${config.TMDB_URL}/movie/now_playing?api_key=${config.TMDB_API_KEY}&session_id=${config.SESSION_ID}`,
      )
      .then(res => {
        dispatch({
          type: WATCHING_NOW,
          payload: res.data.results,
        });
      })
      .catch(err => {
        return err;
      });
  };
}
