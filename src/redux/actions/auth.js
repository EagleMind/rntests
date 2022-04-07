import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../../store';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types/auth';
export const register = async (email, password) => {
  const userEmail = await AsyncStorage.getItem('email');
  const userPassword = await AsyncStorage.getItem('password');
  if (
    (!userEmail === email && !userPassword === password) ||
    userEmail === email
  ) {
    return false;
  } else {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      store.dispatch({type: REGISTER_SUCCESS, isLoggedIn: true});
      return true;
    } catch (e) {
      store.dispatch({type: REGISTER_FAIL, isLoggedIn: false});
      alert(e);
    }
  }
};
export const login = async (email, password) => {
  const userEmail = await AsyncStorage.getItem('email');
  const userPassword = await AsyncStorage.getItem('password');

  if (!userEmail || (userEmail != email && userPassword != password)) {
    store.dispatch({
      type: LOGIN_FAIL,
      isLoggedIn: false,
    });
    return false;
  } else {
    store.dispatch({
      type: LOGIN_SUCCESS,
      isLoggedIn: true,
      user: email,
    });
    return true;
  }
};
export const logout = async () => {
  return await AsyncStorage.clear().then(
    store.dispatch({
      type: LOGOUT,
      isLoggedIn: false,
    }),
  );
};
