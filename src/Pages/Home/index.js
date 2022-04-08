import React from 'react';
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
import {useSelector} from 'react-redux';
export default function Home() {
  const counter = useSelector(state => state);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{console.log('counter', counter.auth.user)} ey</Text>
    </View>
  );
}
