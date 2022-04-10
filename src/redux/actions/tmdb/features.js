import axios from 'axios';
import {WATCHING_NOW} from '../../types/tmdb/features';
import store from '../../../../store';
import config from '../../../config';
export const watchingNow = async () => {
  const watching = await axios
    .get(
      `${config.TMDB_URL}/movie/now_playing?api_key=${config.TMDB_API_KEY}&session_id=${config.SESSION_ID}`,
    )
    .catch(err => {
      return err;
    });
  store.dispatch({
    type: WATCHING_NOW,
    payload: watching.data.results,
  });
};

export const upComing = async () => {
  const upcoming = await axios
    .get(
      `${config.TMDB_URL}/movie/upcoming?api_key=${config.TMDB_API_KEY}&session_id=${config.SESSION_ID}`,
    )
    .catch(err => {
      return err;
    });
  store.dispatch({
    type: WATCHING_NOW,
    payload: upcoming.data.results,
  });
};
