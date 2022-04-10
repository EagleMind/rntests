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
  ActivityIndicator,
  View,
  Image,
} from 'react-native';
import React from 'react';

export function Card(data) {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {data.data.map(movie => {
          return (
            <View style={styles.itemContainer} key={movie.id}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={styles.imageBox}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`,
                    }}></Image>
                </View>
                <View style={styles.details}>
                  <View style={styles.title}>
                    <Text numberOfLines={2} style={{fontWeight: 'bold'}}>
                      {movie.original_title}
                    </Text>
                  </View>
                  <Text>Release Date: {movie.release_date}</Text>
                  <Text>
                    overview:{' '}
                    {movie.overview.length > 100
                      ? movie.overview.substring(0, 100) + '...'
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
                  <View style={styles.detailsButton}></View>
                  <Button title="Show Details"></Button>
                </View>
              </View>
            </View>
          );
        })}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
  },
  itemContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 5,
  },
  title: {
    textAlign: 'left',
    fontWeight: '400',
  },
  imageBox: {
    flex: 0.4,
    width: '100%',
  },
  image: {
    width: 100,
    height: 200,
  },
  detailsButton: {
    marginTop: 5,
  },

  overview: {
    fontFamily: 'Cairo-Bold',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 16,
    marginLeft: 10,
  },
  vote: {
    flexDirection: 'row',
    marginLeft: 10,
    padding: 3,
    color: 'white',
    backgroundColor: '#60a6fb',
    justifyContent: 'space-between',
  },
  voteContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Card;
