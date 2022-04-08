import * as type from '../types/auth';

let user = '';
const initialState = user ? {loggedIn: true, user} : {};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        user: action,
      };
    case type.LOGIN_FAILURE:
      return {
        loggedIn: false,
      };

    case type.REGISTER_SUCCESS:
      return {
        ...state,
        user: action,
      };
    case type.REGISTER_FAIL:
      return {
        loggedIn: false,
      };
    case type.LOGOUT:
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
};
