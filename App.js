/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Button} from 'react-native';
import Register from './src/components/Auth/register/index';
import Login from './src/components/Auth/login/index';
import Profile from './src/components/Profile/index';
import Home from './src/screens/Home/';
import {logout} from './src/redux/actions/tmdb/auth';
import {useSelector} from 'react-redux';
import {LogBox} from 'react-native';
import Movie from './src/screens/Movie';
import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
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
    <NavigationContainer ref={navigationRef}>
      {!isLoggedIn ? (
        <Drawer.Navigator
          initialRouteName="Register"
          useLegacyImplementation={true}>
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator
          useLegacyImplementation={true}
          drawerContent={props => <CustomDrawerContent {...props} />}
          initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen
            name="Movie"
            component={Movie}
            options={{
              drawerItemStyle: {display: 'none'},
              headerRight: () => (
                <Button onPress={() => navigate('Home')} title="Back" />
              ),
            }}
          />
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
