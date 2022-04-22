import * as types from '../../types/tmdb/upcoming';
let upComing = [];
export const upComingNext = (state = upComing, action) => {
  switch (action.type) {
    case types.UP_COMING:
      return {
        upComing: action.payload,
      };

    default:
      return state;
  }
};
