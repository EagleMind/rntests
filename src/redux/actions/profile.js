import axios from 'axios';
import {PROFILE_DETAILS} from '../types/tmdb/profile';
import store from '../../../store';
export const profileDetails = async () => {
  const profile = await axios.get(
    // `${process.env.TMDB_URL}/account?api_key=${process.env.TMDB_API_KEY}?session_id=${process.env.SESSION_ID}`,
    'https://api.themoviedb.org/3/account?api_key=919d4d874d091ca3dd7efc2a528f309e&session_id=d3d72247eb3d2b0614a97820575259cda1f243cf',
  );
  store.dispatch({
    type: PROFILE_DETAILS,
    payload: profile.data,
  });
};
export const watchinNow = async () => {
  const profile = await axios.get(
    // `${process.env.TMDB_URL}/account?api_key=${process.env.TMDB_API_KEY}?session_id=${process.env.SESSION_ID}`,
    'https://api.themoviedb.org/3/movie/now_playing?api_key=919d4d874d091ca3dd7efc2a528f309e&session_id=d3d72247eb3d2b0614a97820575259cda1f243cf',
  );
  store.dispatch({
    type: PROFILE_DETAILS,
    payload: profile.data,
  });
};
