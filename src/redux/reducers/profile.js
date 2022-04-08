import * as types from '../types/profile';
let profile = [];
let initialState = profile;
export const profileDetails = (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_DETAILS:
      return {
        profile: action.payload,
      };

    default:
      return state;
  }
};
