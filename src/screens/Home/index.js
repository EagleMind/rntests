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
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {watchingNow} from '../../redux/actions/tmdb/features';
import {upcomingNow} from '../../redux/actions/tmdb/upcoming';
export function Home({navigation}) {
  console.log(useSelector(state => state.watchingNow).watchingNow);
  const watching = useSelector(state => state.watchingNow).watchingNow;
  const upComing = useSelector(state => state.upComing).upComing;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(upcomingNow());
    dispatch(watchingNow());
    if (watching && upComing) {
      setLoading(false);
    }
  }, []);
  return (
    <ScrollView>
      <Text style={styles.caregoryTitle}>Playing Now</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal={true}>
          {watching.map(movie => {
            return (
              <View style={styles.itemContainer} key={movie.id}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.imageBox}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
                      }}></Image>
                  </View>
                  <View style={styles.details}>
                    <View>
                      <Text numberOfLines={2} style={styles.title}>
                        {movie.original_title}
                      </Text>
                    </View>
                    <Text style={styles.releaseDate}>{movie.release_date}</Text>
                    <Text style={styles.overview}>
                      {movie.overview.length > 80
                        ? movie.overview.substring(0, 80) + '...'
                        : movie.overview}
                    </Text>
                    <View style={styles.voteContainer}>
                      <Text numberOfLines={1}>Vote average :</Text>
                      <Text numberOfLines={1} style={styles.vote}>
                        {movie.vote_average}/10
                      </Text>
                    </View>
                    <View style={styles.voteContainer}>
                      <Text numberOfLines={1}>Vote count :</Text>
                      <Text numberOfLines={1} style={styles.vote}>
                        {movie.vote_count}
                      </Text>
                    </View>
                    <Button
                      style={{width: 100}}
                      title="Show Details"
                      onPress={() =>
                        navigation.navigate('Movie', {
                          movie: movie,
                        })
                      }></Button>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
      <Text style={styles.caregoryTitle}>Upcoming</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView horizontal={true}>
          {upComing.map(movie => {
            return (
              <View style={styles.itemContainer}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.imageBox}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
                      }}></Image>
                  </View>
                  <View style={styles.details}>
                    <View>
                      <Text numberOfLines={2} style={styles.title}>
                        {movie.original_title}
                      </Text>
                    </View>
                    <Text style={styles.releaseDate}>{movie.release_date}</Text>
                    <Text style={styles.overview}>
                      {movie.overview.length > 80
                        ? movie.overview.substring(0, 80) + '...'
                        : movie.overview}
                    </Text>
                    <View style={styles.voteContainer}>
                      <Text numberOfLines={1}>Vote average :</Text>
                      <Text numberOfLines={1} style={styles.vote}>
                        {movie.vote_average}/10
                      </Text>
                    </View>
                    <View style={styles.voteContainer}>
                      <Text numberOfLines={1}>Vote count :</Text>
                      <Text numberOfLines={1} style={styles.vote}>
                        {movie.vote_count}
                      </Text>
                    </View>
                    <Button
                      style={{width: 100}}
                      title="Show Details"
                      onPress={() =>
                        navigation.navigate('Movie', {
                          movie: movie,
                        })
                      }></Button>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
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
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'white',
  },
  container: {
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
  },
  itemContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    width: 300,
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    width: 350,
  },

  details: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 5,
    marginLeft: 60,
  },
  title: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
  },

  imageBox: {
    flex: 0.2,
    width: '100%',
  },
  image: {
    width: 100,
    height: 200,
  },

  detailsButton: {
    width: 100,
  },

  vote: {
    flexDirection: 'row',
    marginLeft: 10,
    padding: 3,
    color: 'grey',
    justifyContent: 'space-between',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginVertical: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Home;
