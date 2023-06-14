import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import WebView from 'react-native-webview';
import styles from './Styles';
import YoutubePlayer from "react-native-youtube-iframe";
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  const [videos, setVideos] = useState([
    { id: 'jKAXOuJb_8U' },
    { id: 'VIDEO_ID_2'  },
    { id: 'VIDEO_ID_3'  },
    // Add more videos as needed for testing
  ]);

  const staticVideoList = [
    { id: 'jKAXOuJb_8U' },
    { id: 'VIDEO_ID_2'  },
    { id: 'VIDEO_ID_3'  },
  ]

  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [newVideoId, setNewVideoId] = useState('');

  useEffect(() => {
    loadVideos();
  }, [])

  const loadVideos = async () => {
    try {
      const savedVideos = await AsyncStorage.getItem('videos')
      if (savedVideos) {
        setVideos(JSON.parse(savedVideos))
      }
    } catch(error) {
      console.log('Error loading videos', error)
    }
  }

  const saveVideos = async (videosToSave) => {
    try {
      await AsyncStorage.setItem('videos', JSON.stringify(videosToSave))
    } catch(error) {
      console.log('Cant save videos error: ', error)
    }
  }


  const addVideo = () => {
    //checking if the videoid is not empty
    if(newVideoId.trim()) {
      if(!(videos.some(video => video.id === newVideoId.trim()))) {
        const newVideo = {
          id: newVideoId.trim()
        }
        const updatedVideos = [...videos, newVideo]
        setVideos(updatedVideos)
        saveVideos(updatedVideos)
        console.log(`${newVideoId} added`)
        setNewVideoId('')
      }
    }
    

  }

  const deleteVideo = (videoId) => {
    const updatedVideos = videos.filter((video) => video.id!==videoId)
    setVideos(updatedVideos)
    saveVideos(updatedVideos)
    console.log(`${videoId} deleted`)

    if(currentVideoId == videoId) {
      setCurrentVideoId(null);
    }
  }

  const addFromList = (videoId) => {
    setNewVideoId(videoId);
    addVideo();
  }

  const renderVideoOptions = ({item}) => {
    return (
    <View style={styles.videoItem}>
      <Text style={styles.addButton} onPress={() => addFromList(item.id)}>{item.id}</Text>
    </View>
  )}
  const renderVideoItem = ({ item }) => (
    <ScrollView style={styles.videoItem}>
        <YoutubePlayer
          height={300}
          thumbnail_height = {300}
          videoId={`${item.id}`}
        />
        <Text style = {styles.deleteButton} onPress = {() => deleteVideo(item.id)}>
          Delete
        </Text>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style = {styles.input}
        placeholder='Enter new video Id'
        value={newVideoId}
        onChangeText={newText => setNewVideoId(newText)}
      />
      <Button title='Add Video' onPress={addVideo}/>
        <View>
        <Text>Choose any of these video Ids to add them to the list</Text>
        <FlatList
          data={staticVideoList}
          renderItem={renderVideoOptions}
          keyExtractor={(item) => item.id}
        />
        </View>

        <FlatList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          // contentContainerStyle={{
          //   flexGrow:1,
          // }}
        />

      
    </SafeAreaView>
  );
};



export default App;
