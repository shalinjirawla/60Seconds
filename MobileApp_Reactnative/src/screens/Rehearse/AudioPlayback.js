import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  ImageBackground
} from 'react-native';
import { IMAGES_MOCKS } from '../../constants/mocks';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RehersalSettings from '../../components/RehersalSettings';
import SoundCloudWaveform from 'react-native-soundcloud-waveform';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import shorid from 'shortid';

const { width } = Dimensions.get('screen');
const window = Dimensions.get('window');
const ratio = window.width / 421;

const filePath = FileSystem.documentDirectory + 'rehearse';

export default class AudioPlayback extends React.Component {

  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.playbackTime = "",
      this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      isReplay: false,
      showModal: false,
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
  }

  // const [showModal, setShowModal] = useState(false);
  // const [recording, setRecording] = useState(null);
  // const [sound, setSound] = useState(null);
  // const [playbackTime, setPlaybackTime] = useState('');

  // useEffect(() => {
  //   const { recordingStop, soundStop, timeStamp } = navigation.getParam('audio');
  //   setRecording(recordingStop);
  //   setSound(soundStop);
  //   setPlaybackTime(timeStamp);
  //   console.log("RecordingFinal params in audio = ",recordingStop)
  //   console.log("sound params in audio = ",soundStop)
  //   console.log("palyback timestamp in audio = ",timeStamp)
  //   navigation.setParams({
  //     openModal: () => {
  //       setShowModal(true);
  //     },
  //   });
  // }, []);

  async componentDidMount() {

    this.props.navigation.setParams({
      openModal: () => {
        this.setState({ showModal: true });
      },
    });

    try {
      const { recordingStop, timeStamp, sound, isReplay } = this.props.navigation.getParam('audio');
      this.recording = recordingStop;
      this.playbackTime = timeStamp;
      this.sound = sound
      this.setState({ isReplay: isReplay })

      console.log("Sound in playback = ", this.sound)
      console.log("isReplay in playback = ", this.state.isReplay)
      console.log("Recording in playback audio = ", this.recording)
      console.log("Recording uri in playback audio = ", this.recording._uri)

      // this._preparePlayback();
    } catch (err) {
      console.log("error in getting data back in audiofile = ", err)
    }

  }

  _keepRecording = async () => {
    if (this.state.isPlaying) {
      this.sound.pauseAsync();
      this.setState({ isPlaying: false });
    }

    try {
      if (this.state.isReplay) {
        console.log("keeping in isReplay = ", this.recording)
        Alert.alert("Saved", "Your recording has been stored.", [
          {
            text: "OK",
            onPress: () => this.props.navigation.push("Rehearse")
          }
        ]);
      } else {
        try {
          // this.sound.pauseAsync()
          const audioId = shorid.generate();
          const dur = this.playbackTime.split("/")[1].trim();
          console.log("playback time = ", dur)

          await FileSystem.makeDirectoryAsync(`${filePath}/`, {
            intermediates: true
          });

          await FileSystem.moveAsync({
            from: this.recording._uri,
            to: `${filePath}/${dur}_demo_${audioId}.caf`
          }).then(() => {
            console.log("File Moved")
            Alert.alert("Saved", "Your recording has been stored.", [
              {
                text: "OK",
                onPress: () => this.props.navigation.push("Rehearse")
              }
            ]);
          });

          console.log('Saved one : ');
          console.log(`${FileSystem.documentDirectory}audios/${this.playbackTime}_demo_${audioId}.caf`);

        } catch (err) {
          console.log("error storing nonReplay audio = ", err)
        }
      }
    } catch (err) {
      console.log("error in keep video = ", err)
    }

  }

  _deleteRecording = async () => {
    if (this.state.isPlaying) {
      this.sound.pauseAsync();
      this.setState({ isPlaying: false });
    }

    try {
      if (this.state.isReplay) {
        console.log("Deleting in isReplay = ", this.recording)
        await FileSystem.deleteAsync(this.recording).then((res) => {
          // shouldFetch(false);
          console.log("audio file deleted = ", res)
          Alert.alert("Deleted", "Your recording has been deleted.", [
            {
              text: "OK",
              onPress: () => this.props.navigation.push("Rehearse")
            }
          ]);
        }).catch((err) => {
          console.log("Error deleting = ", err)
        })
      } else {
        console.log("noting saved to delete")
        Alert.alert("Deleted", "Your recording has been deleted.", [
          {
            text: "OK",
            onPress: () => this.props.navigation.push("Rehearse")
          }
        ]);
      }

    } catch (err) {
      console.log("error in delete audio = ", err);
    }
  }

  _onPlayPausePressed = async () => {
    console.log("sound in playpause = ", this.sound)
    if (this.sound != null) {
      try {
        if (this.state.isPlaying) {
          this.sound.pauseAsync();
          this.setState({ isPlaying: false });
        } else {
          this.sound.playAsync();
          this.setState({ isPlaying: true });
        }
      } catch (err) {
        console.log("error in playpause = ", err)
      }
    } else {
      console.log("playing replay")
      console.log('Trying to play sound...', this.recording)

      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync({
          uri: this.recording
        });
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        // An error occurred!
        console.log("error in replay playing = ", error)
      }
    }
  };

  render() {
    const taskScriptContents = this.props.navigation.getParam('taskScriptContents');

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#28679b',
        }}>
        <ImageBackground source={require('../../../assets/header_bar.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', top: 0, justifyContent: 'center', }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 45 * ratio
          }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
              <Image
                style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                source={require('../../../assets/icon-close.png')}
              />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 20 * ratio }}>Rehearse</Text>
            <TouchableOpacity onPress={() => this.setState({ showModal: true })} >
              <Image
                style={{ width: 25 * ratio, height: 25 * ratio, resizeMode: 'contain' }}
                source={require('../../../assets/icon-settings.png')}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* <Audio /> */}
        <ScrollView style={{ flex: 0.6, height: '100%', padding: 20 }}>

          {
            taskScriptContents && taskScriptContents.map((script, index) => {
              return <Text style={styles.text} key={index}>{script.scriptFieldvalue}</Text>
            })
          }
        </ScrollView>
        <View
          style={{
            flex: 0.4,
            alignItems: 'center',
            paddingBottom: 5,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
            justifyContent: 'space-evenly',
          }}>
          <RecordingControls onPressKeep={this._keepRecording} onPressDelete={this._deleteRecording} />
          <RecordingButton onPress={this._onPlayPausePressed} time={this.playbackTime} />
        </View>
        <RehersalSettings
          isVisible={this.state.showModal}
          onClose={(value) => this.setState({ showModal: value })}
        />
      </View>
    );
  }
};

Audio['navigationOptions'] = ({ navigation }) => {
  const openModal = navigation.getParam('openModal');
  return {
    headerTitle: 'Your Rehearsed Audio #1',
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerRight: () => (
      <TouchableOpacity style={{ paddingRight: 15 }} onPress={openModal}>
        <SimpleLineIcons
          name="equalizer"
          size={24}
          color="white"
          style={{ transform: [{ rotate: '90deg' }] }}
        />
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <TouchableOpacity
        style={{ paddingLeft: 15 }}
        onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
    ),
    headerBackground: () => (
      <Image
        resizeMode="cover"
        style={{ height: Platform.OS == 'ios' ? 140 : 80 }}
        source={IMAGES_MOCKS.profileHeader}
      />
    ),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
};

// export default AudioPlayback;

const styles = StyleSheet.create({
  text: { fontSize: 30 * ratio, lineHeight: 46 * ratio, color: 'white', paddingBottom: 20 },
  backgroundImage: {
    width: window.width,
    height: 89 * window.width / 414
  },
});

const RecordingControls = ({ onPressKeep, onPressDelete }) => (
  <View
    style={{
      height: 40,
      borderRadius: 20,
      flexDirection: 'row',
      backgroundColor: '#1C3D5B',
    }}>
    <TouchableOpacity
      style={{
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#46739c',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={(onPressKeep)}>
      <Image
        source={IMAGES_MOCKS.tickIcon}
        style={{ height: 15, width: 15, resizeMode: 'contain' }}
      />
      <Text style={{ color: 'white', fontSize: 10 }}>Keep</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={(onPressDelete)}>
      <Image
        source={IMAGES_MOCKS.deleteIcon}
        style={{ height: 15, width: 15, resizeMode: 'contain' }}
      />
      <Text style={{ color: 'white', fontSize: 10 }}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const RecordingButton = ({ onPress, time }) => {
  const setTime = () => { };
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={{ flex: 0.12 }} onPress={(onPress)}>
        <Image
          source={IMAGES_MOCKS.playIcon}
          style={{ height: 50, width: 50, resizeMode: 'contain' }}
        />
      </TouchableOpacity>
      <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
        <SoundCloudWaveform
          active="#9bb5ca"
          activeInverse="white"
          width={width * 0.78}
          height={30}
          waveformUrl="https://w1.sndcdn.com/PP3Eb34ToNki_m.png"
          setTime={setTime}
          percentPlayed={50}
        />
      </View>
      <View style={{ flex: 0.1, height: '100%', justifyContent: 'flex-end' }}>
        <Text style={{ color: 'white', textAlignVertical: 'auto' }}>0:35</Text>
      </View>
    </View>
  );
};
