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
import {createDrawerNavigator} from '@react-navigation/drawer';
import Register from './src/components/Auth/register/index';
import Login from './src/components/Auth/login/index';
import Profile from './src/components/Profile/index';
import Home from './src/Pages/Home/';
import {logout} from './src/redux/actions/tmdb/auth';
import {useSelector} from 'react-redux';
export function App() {
  const isLoggedIn = useSelector(state => state)?.auth?.user?.isLoggedIn;
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      {console.log('app', isLoggedIn)}
      {!isLoggedIn ? (
        <Drawer.Navigator initialRouteName="Register">
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Login" component={Login} />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={Home}
            options={({navigation}) => ({
              headerRight: () => (
                <Button
                  title="Logout"
                  onPress={() => logout().then(navigation.navigate('Login'))}
                />
              ),
            })}
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
