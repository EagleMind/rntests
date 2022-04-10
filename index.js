/**
 * @format
 */
import React, {useContext} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
