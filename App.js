/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useContext} from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './src/components/Auth/register/index';
import Login from './src/components/Auth/login/index';
import Home from './src/Pages/Home/';
import {logout} from './src/redux/actions/auth';
export function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerBackVisible: false}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            headerLeft: () => (
              <Button
                title="Logout"
                onPress={() => logout().then(navigation.navigate('Login'))}
              />
            ),
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Profile')}
                title="Profile"
              />
            ),
          })}
        />

        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
