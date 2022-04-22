import * as types from '../../types/tmdb/upcoming';
const upComing = [];
export const upComingNext = (state = upComing, action) => {
  switch (action.type) {
    case types.UP_COMING:
      return {
        ...state,
        upComing: action.payload,
      };

    default:
      return state;
  }
};
