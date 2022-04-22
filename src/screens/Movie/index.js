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
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {WebView} from 'react-native-webview';
import config from '../../config';
export function Movie({route}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setisLoading] = useState(true);
  const [teaser, setTeaser] = useState({});
  const movie = route.params.movie;
  async function watchTeaser(id) {
    // Yet we need to make the api call of /movies/{movie_id}
    // to get the Teaser's data

    await axios
      .get(
        `${config.TMDB_URL}/movie/${id}/videos?api_key=${config.TMDB_API_KEY}&session_id=${config.SESSION_ID}`,
      )
      .then(teaser => {
        setTeaser(teaser.data.results);
        setModalVisible(true);
        setisLoading(false);
      });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        blurRadius={90}
        source={{
          uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
        }}>
        <Image
          style={styles.image}
          source={{
            uri: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`,
          }}></Image>
      </ImageBackground>
      <View style={styles.box}>
        <View style={styles.details}>
          <Text numberOfLines={2} style={styles.textBold}>
            {movie.original_title}
          </Text>
          <Text style={styles.textLight}>
            Release Date: {movie.release_date}{' '}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.textLight}>{movie.overview}</Text>
          <View style={styles.separator} />
          <View style={styles.footerDetails}>
            <Text numberOfLines={1} style={styles.textLight}>
              Vote average : {movie.vote_average}/10
            </Text>
            <Text numberOfLines={1} style={styles.textLight}>
              count : {movie.vote_count}
            </Text>
          </View>
          <View style={{marginVertical: 20}}>
            <Button
              style={[{width: '90%', margin: 10, backgroundColor: 'red'}]}
              title="Watch Teaser"
              onPress={() => watchTeaser(movie.id)}></Button>
          </View>
        </View>
      </View>
      {/* Modal to see Movie details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={modalStyling.centeredView}>
          <View style={modalStyling.modalView}>
            {isloading & teaser ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <View>
                <View style={{width: 350, height: 350}}>
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
                    onPress={() => setModalVisible(!modalVisible)}></Button>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
      {/* Modal to see Movie details */}
    </SafeAreaView>
  );
}
const modalStyling = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonsVertical: {
    marginVertical: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 400,
    resizeMode: 'contain',
  },
  separator: {
    borderBottomColor: '#DFDFDF',
    borderBottomWidth: 1,
    marginVertical: 10,
  },

  box: {
    flex: 1,
    zIndex: 1,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
    borderRadius: 40,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    marginVertical: -35,
    backgroundColor: 'white',
  },
  details: {
    padding: 20,
  },
  footerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLight: {
    fontSize: 16,
    fontWeight: '300',
  },
  textBold: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Movie;
