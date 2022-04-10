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
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {WebView} from 'react-native-webview';
export function Card(data) {
  const [modalVisible, setModalVisible] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [isloading, setisLoading] = useState(true);
  const [teaser, setTeaser] = useState({});
  const [teaserActive, setTeaserActive] = useState(false);
  async function showDetails(id) {
    // We don't need to call the /movies/{movie_id} API because the
    // current data has the movie detail already so to optimise
    // network bandwidth we simply filter the data with the movie Id
    const movie = await data.data.find(item => item.id == id);
    setMovieDetails(movie);
    setModalVisible(true);
    setisLoading(false);
  }
  async function watchTeaser(id) {
    // Yet we need to make the api call of /movies/{movie_id}
    // to get the Teaser's data
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=919d4d874d091ca3dd7efc2a528f309e&session_id=d3d72247eb3d2b0614a97820575259cda1f243cf`,
      )
      .then(teaser => {
        setTeaser(teaser.data.results);
        setTeaserActive(true);
      });
  }
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
                  <Button
                    title="Show Details"
                    onPress={() => showDetails(movie.id)}></Button>
                </View>
              </View>
            </View>
          );
        })}
      </SafeAreaView>
      {/* Modal to see Movie details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          {teaserActive ? (
            <View style={{width: 300, height: 300}}>
              {/* Getting only the first video of teasers because 
              there was multiple Official trailers Which doesn't make sense
              otherwise i would-ve make another screen with their list */}
              <WebView
                source={{
                  uri: `https://www.youtube.com/embed/${teaser[0]?.key}?autoplay=1`,
                }}
              />
              <Button
                title="Close"
                onPress={() => setTeaserActive(false)}></Button>
            </View>
          ) : (
            <View style={styles.modalView}>
              {isloading & teaser ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <View>
                  <View>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDetails.backdrop_path}`,
                      }}></Image>
                  </View>
                  <View>
                    <Text>Language : {movieDetails.original_language}</Text>
                    <Text>{movieDetails.original_title}</Text>
                    <Text>{movieDetails.overview}</Text>
                    <Text>Popularity : {movieDetails.popularity}</Text>
                    <Text>Release date : {movieDetails.release_date}</Text>
                    <Text>{movieDetails.video}</Text>
                    <Text>Vote average : {movieDetails.vote_average}</Text>
                    <Text>Vote count : {movieDetails.vote_count}</Text>
                    <Button
                      title="Watch Trailer"
                      onPress={() => watchTeaser(id)}></Button>
                  </View>
                </View>
              )}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
      {/* Modal to see Movie details */}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
export default Card;
