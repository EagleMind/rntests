import AsyncStorage from '@react-native-async-storage/async-storage';
import * as type from '../types/auth';

const user = '';
const initialState = user ? {loggedIn: true, user} : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: user,
      };
    case type.LOGIN_FAILURE:
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
}
export function Registration(state = initialState, action) {
  switch ((action.type, payload)) {
    case type.REGISTER_SUCCESS:
      return {
        loggedIn: true,
        user: payload,
      };
    case type.REGISTER_FAIL:
      return {
        loggedIn: false,
      };
    case type.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: user,
      };
    case type.LOGIN_FAIL:
      console.log('se');
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
}
