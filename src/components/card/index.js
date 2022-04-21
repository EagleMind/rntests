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
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  View,
  Image,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import config from '../../config';
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
        `${config.TMDB_URL}/movie/${id}/videos?api_key=${config.TMDB_API_KEY}&session_id=${config.SESSION_ID}`,
      )
      .then(teaser => {
        setTeaser(teaser.data.results);
        setTeaserActive(true);
      });
  }
  return (
    <ScrollView horizontal={true}>
      <SafeAreaView style={styles.container}>
        {data.data.map(movie => {
          return (
            <View style={styles.itemContainer} key={movie.id}>
              <View style={{flex: 1, flexDirection: 'row'}}>
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
                  <View style={modalStyling.movHeader}>
                    <Image
                      style={modalStyling.image}
                      source={{
                        uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieDetails.backdrop_path}`,
                      }}></Image>
                    <View>
                      <View style={modalStyling.specs}>
                        <Text style={modalStyling.title}>
                          {movieDetails.original_title}
                        </Text>
                        <Text>Popularity : {movieDetails.popularity}</Text>
                        <Text>Vote count : {movieDetails.vote_count}</Text>
                        <Text>Vote average : {movieDetails.vote_average}</Text>
                        <Text>Date : {movieDetails.release_date}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={modalStyling.overviewTitle}>Overview :</Text>
                  <Text>{movieDetails.overview}</Text>
                  <View style={modalStyling.buttonsVertical}>
                    <Button
                      style={modalStyling.buttonsVertical}
                      title="Watch Trailer"
                      onPress={() => watchTeaser(movieDetails.id)}></Button>
                  </View>
                  <View style={modalStyling.buttonsVertical}>
                    <Button
                      style={modalStyling.buttonsVertical}
                      title="Close"
                      onPress={() => setModalVisible(!modalVisible)}></Button>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </Modal>
      {/* Modal to see Movie details */}
    </ScrollView>
  );
}
const modalStyling = StyleSheet.create({
  specs: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
  },

  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  movHeader: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonsVertical: {
    marginVertical: 10,
  },
  releaseDate: {
    color: '#C4C4C4',
  },
  image: {
    width: 150,
    height: 200,
  },
});
const styles = StyleSheet.create({
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
export default Card;
