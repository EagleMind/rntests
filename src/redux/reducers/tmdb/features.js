import * as types from '../../types/tmdb/features';
let watchingNow = [];
export const watchingNowState = (state = watchingNow, action) => {
  switch (action.type) {
    case types.WATCHING_NOW:
      return {
        watchingNow: action.payload,
      };

    default:
      return state;
  }
};
