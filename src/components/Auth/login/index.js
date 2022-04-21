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
import {login} from '../../../redux/actions/tmdb/auth';
import React, {useEffect, useState} from 'react';
import {DrawerActions} from '@react-navigation/native';

export function Login({navigation}) {
  const [email, setEmail] = useState('aaaa');
  const [password, setPassword] = useState('aaaa');

  useEffect(() => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }, []);
  const onSignIn = async (email, password) => {
    login(email, password).then(res => {
      res ? navigation.navigate('Home') : alert('oops,try again');
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../Auth/bg.jpg')}
        style={styles.background}>
        <View style={styles.loginContainer}>
          <View>
            <Text style={styles.loginTitle}>LOGIN</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="aaaa"
              placeholderTextColor="white"
              onChangeText={email => setEmail(email)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="aaaa"
              placeholderTextColor="white"
              secureTextEntry={true}
              onChangeText={password => setPassword(password)}
            />
          </View>
          <View style={styles.loginBtn}>
            <Text>No account yet?</Text>
            <Button
              title="REGISTER"
              color={'black'}
              onPress={() => navigation.navigate('Register')}
            />
          </View>
          <View style={styles.mainButton}>
            <Button
              title="LOGIN"
              color={'black'}
              onPress={() => onSignIn(email, password)}></Button>
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
export default Login;
