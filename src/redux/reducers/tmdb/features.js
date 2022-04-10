import * as types from '../../types/tmdb/features';
let watchingNow = [];
let initialState = watchingNow;
export const watchingNowFeature = (state = initialState, action) => {
  switch (action.type) {
    case types.WATCHING_NOW:
      return {
        watchingNow: action.payload,
      };

    default:
      return state;
  }
};
export const upComing = (state = initialState, action) => {
  switch (action.type) {
    case types.UP_COMING:
      return {
        upcoming: action.payload,
      };

    default:
      return state;
  }
};
