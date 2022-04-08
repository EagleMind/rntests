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
import React from 'react';

export function Card(userData) {
  return (
    <View style={styles.itemContainer}>
      <View style={{width: '70%'}}>
        {console.log('userData.username', userData.userData.username)}
        <Text numberOfLines={2} style={styles.description}>
          {userData.userData.username}
        </Text>
      </View>

      <View style={styles.productTotal}>
        <Text numberOfLines={1} style={styles.productPrice}>
          {userData.userData.id}
        </Text>
      </View>
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
export default Card;
