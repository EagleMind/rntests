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
  TouchableOpacity,
  View,
} from 'react-native';
import {login} from '../../../redux/actions/auth';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
export function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useSelector(state => state);
  useEffect(() => {
    !isLoggedIn ? navigation.navigate('Register') : isLoggedIn;
  }, []);
  const onSignIn = async (email, password) => {
    login(email, password).then(res => {
      res ? navigation.navigate('Home') : alert('oops,try again');
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.loginTitle}>Login</Text>
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
      <Text>Not a member yet?</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />

      <TouchableOpacity style={styles.loginBtn}>
        <Text
          style={styles.loginText}
          onPress={() => onSignIn(email, password)}>
          Login
        </Text>
      </TouchableOpacity>
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
export default Login;
