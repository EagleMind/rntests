/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  ImageBackground,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {register} from '../../../redux/actions/tmdb/auth';
import {DrawerActions} from '@react-navigation/native';
export function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }, []);

  async function onSignUp(email, password) {
    register(email, password).then(res => {
      res ? navigation.navigate('Login') : alert('Oops, try again');
    });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/bg.jpg')}
        style={styles.background}>
        <View style={styles.loginContainer}>
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
          <View style={styles.loginBtn}>
            <Text>Already have an account?</Text>

            <Button
              title="Login"
              color={'black'}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
          <View style={styles.mainButton}>
            <Button
              title="Register"
              color={'black'}
              onPress={() => onSignUp(email, password)}></Button>
          </View>
        </View>
      </ImageBackground>
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
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loginContainer: {
    flex: 0.7,
    justifyContent: 'center',
    margin: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: 'black',
    borderRadius: 30,
    width: '90%',
    height: 45,
    marginVertical: 10,
    color: 'white',
    alignItems: 'center',
  },

  TextInput: {
    color: 'white',
  },

  loginBtn: {
    marginVertical: 10,
    width: 200,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainButton: {
    width: '80%',
  },
  loginTitle: {
    color: 'black',
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  loginText: {
    color: 'white',
  },
});
export default Register;
