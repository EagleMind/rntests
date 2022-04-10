/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import store from '../../../store';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {profileDetails} from '../../redux/actions/tmdb/profile';
import Card from '../card';
export function Profile() {
  const profile = useSelector(state => state.profile).profile;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    profileDetails().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View style={styles.box}>
          <Text style={styles.text}>TMDB Username : {profile.username}</Text>
          <Text style={styles.text}>TMDB Id : {profile.id}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
  },
  box: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#3377CF',
  },
});
export default Profile;
