import React, {useEffect, useState} from 'react';
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
  ActivityIndicator,
  View,
} from 'react-native';
import Card from '../../components/card';
import {useSelector} from 'react-redux';
import {watchingNow} from '../../redux/actions/tmdb/features';

export function Home() {
  const watchingNowState = useSelector(state => state).watchingNowFeature;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    watchingNow().then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <View style={styles.itemContainer}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Card data={watchingNowState.watchingNow}></Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',

    color: 'white',
  },
});
export default Home;
