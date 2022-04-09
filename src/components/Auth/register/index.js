/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  Button,
  useColorScheme,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {register} from '../../../redux/actions/tmdb/auth';
import {useSelector} from 'react-redux';
export function Register({navigation}) {
  const [email, setEmail] = useState('test');
  const [password, setPassword] = useState('test');
  const isLoggedIn = useSelector(state => state);
  useEffect(() => {
    !isLoggedIn ? navigation.navigate('Register') : isLoggedIn;
  }, []);
  function userHasAccount() {
    AsyncStorage.clear().then(navigation.navigate('Login'));
  }
  async function onSignUp(email, password) {
    register(email, password).then(res => {
      res ? navigation.navigate('Login') : alert('Oops, try again');
    });
  }

  return (
    <View style={styles.container}>
      {console.log(isLoggedIn)}
      <View>
        <Text style={styles.loginTitle}>Register</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Email"
          placeholderTextColor="white"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <Text>Already have an account?</Text>
      <Button title="Login" onPress={() => userHasAccount()} />

      <Button
        title="Register"
        style={styles.loginText}
        onPress={() => onSignUp(email, password)}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#3377FF',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    color: 'white',
    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'white',
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#3377CF',
  },
  loginTitle: {
    color: 'grey',
    fontSize: 20,
    marginBottom: 40,
  },
  loginText: {
    color: 'white',
  },
});
export default Register;
