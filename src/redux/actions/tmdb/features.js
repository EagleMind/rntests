import axios from 'axios';
import {WATCHING_NOW} from '../../types/tmdb/features';
export const watchingNow = async () => {
  const watchingNow = await axios.get(
    // `${process.env.TMDB_URL}/account?api_key=${process.env.TMDB_API_KEY}?session_id=${process.env.SESSION_ID}`,
    'https://api.themoviedb.org/3/movie/now_playing?api_key=919d4d874d091ca3dd7efc2a528f309e&session_id=d3d72247eb3d2b0614a97820575259cda1f243cf',
  );
  store.dispatch({
    type: WATCHING_NOW,
    payload: watchingNow.data,
  });
};
