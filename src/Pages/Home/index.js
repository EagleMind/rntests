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
    <ScrollView>
      <View style={styles.itemContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <View>
            <Text style={styles.caregoryTitle}>Playing Now</Text>

            <Card data={watchingNowState.watchingNow}></Card>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  caregoryTitle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    color: 'white',
  },
});
export default Home;
