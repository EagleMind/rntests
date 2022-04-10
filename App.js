/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Register from './src/components/Auth/register/index';
import Login from './src/components/Auth/login/index';
import Profile from './src/components/Profile/index';
import Home from './src/Pages/Home/';
import {logout} from './src/redux/actions/tmdb/auth';
import {useSelector} from 'react-redux';
import {LogBox} from 'react-native';
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => logout()} />
    </DrawerContentScrollView>
  );
}
export function App() {
  // this is the last version of RN gesture handler (2.3.2) so i'm not sure why i'm getting this error
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
  const isLoggedIn = useSelector(state => state)?.auth?.user?.isLoggedIn;
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Drawer.Navigator initialRouteName="Register">
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{headerBackVisible: true}}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
