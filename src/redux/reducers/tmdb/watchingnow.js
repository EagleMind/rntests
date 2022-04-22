import * as types from '../../types/tmdb/watchingnow';
const watchingNow = [];
export const watchingNowState = (state = watchingNow, action) => {
  switch (action.type) {
    case types.WATCHING_NOW:
      return {
        ...state,
        watchingNow: action.payload,
      };

    default:
      return state;
  }
};
