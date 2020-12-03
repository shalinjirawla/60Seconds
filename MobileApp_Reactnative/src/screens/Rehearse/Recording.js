import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Platform,
  Alert,
} from 'react-native';
import { IMAGES_MOCKS } from '../../constants/mocks';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import RehersalSettings from '../../components/RehersalSettings';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import FullScreenLoader from '../../components/FullScreenLoader';

const window = Dimensions.get('window');
const ratio = window.width / 421;
const filePath = FileSystem.documentDirectory + 'rehearse';

export default class Recording extends React.Component {

  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      isFetching: false,
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
      isRecording: false,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      audios: [],
    };
    this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
  }
  // const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
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

    // this._onRecordPressed();
    this._askForPermissions();

  }

  // request permission from user to record audio
  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });

  };

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecording();
      }
    }
  };

  _onRecordPressed = () => {
    const { haveRecordingPermissions } = this.state;
    if (!haveRecordingPermissions)
      Alert.alert("You do not have audio permission to rehearse.");

    if (this.state.isRecording) {
      this._stopRecording();
    } else {
      this._beginRecording();
    }
  };

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
        this.state.soundDuration
      )}`;
    }
    return '';
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  async _beginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    console.log("recording in begin = ", this.recording);
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });

    console.log("Record details = ", this.recording._uri);

  }

  async _restartRecording() {

    this.setState({
      isLoading: true
    });
    console.log("restart recording = ", this.recording)

    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
      console.log("error while unloading sound in restart recording = ", error)
    }

    // const recordingStop = this.recording;

  }

  async _stopRecording() {


    this.setState({
      isLoading: true,
      isFetching: true
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
      console.log("error while unloading sound in stop = ", error)
    }

    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;

    this.setState({
      isLoading: false,
      isFetching: false
    });

    if (!this.state.isLoading) {
      const recordingStop = this.recording;
      // const soundStop = this.sound;
      const timeStamp = this._getPlaybackTimestamp();
      const isReplay = false;
      console.log("in stop data = ", recordingStop)
      this.props.navigation.push("AudioPlayback", {
        audio: { recordingStop, timeStamp, sound, isReplay },
        taskScriptContents: this.props.navigation.getParam('taskScriptContents') || null
      })
    }
  }

  render() {
    const taskScriptContents = this.props.navigation.getParam('taskScriptContents');
    console.log('render called ', this.state.recordingDuration);
    return (
      <>
        <View
          style={{
            flex: 1,
            backgroundColor: '#28679b',
          }}>

          {/* <Recording navigation={ this.props.navigation } /> */}

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
            <RecordingControls onPress={this._restartRecording} />
            <View>
              <Text style={[styles.recordingTimestamp, { opacity: this.state.isRecording ? 1.0 : 0.0 }]}>
                {this._getRecordingTimestamp()}
              </Text>
            </View>
            {/* <RecordingButton onPress={() => navigation.navigate("Audio")} /> */}
            <RecordingButton onPress={this._onRecordPressed} />
          </View>
          <RehersalSettings
            isVisible={this.state.showModal}
            onClose={(value) => this.setState({ showModal: value })}
          />
        </View>
        <FullScreenLoader isFetching={this.state.isFetching} />
      </>
    );
  }
};

Recording['navigationOptions'] = ({ navigation }) => {
  const openModal = navigation.getParam('openModal');
  return {
    headerTitle: 'Audio Rehearse',
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
        <AntDesign name="close" size={24} color="white" />
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

const styles = StyleSheet.create({
  text: { fontSize: 30 * ratio, lineHeight: 46 * ratio, color: 'white', paddingBottom: 20 },
  recordingTimestamp: {
    paddingLeft: 20,
    color: 'white',
    alignSelf: 'center'
  },
  backgroundImage: {
    width: window.width,
    height: 89 * window.width / 414
  },
});

const RecordingControls = ({ onPress }) => (
  <View
    style={{
      height: 40,
      borderRadius: 20,
      flexDirection: 'row',
      backgroundColor: '#5d88ad',
    }}>
    <TouchableOpacity
      style={{
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#46739c',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={IMAGES_MOCKS.slowIcon}
        style={{ height: 15, width: 15, resizeMode: 'contain' }}
      />
      <Text style={{ color: 'white', fontSize: 10 }}>Slow</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        flex: 1,
        borderRightWidth: 1,
        borderColor: '#46739c',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={IMAGES_MOCKS.fastFrwIcon}
        style={{ height: 15, width: 15, resizeMode: 'contain' }}
      />
      <Text style={{ color: 'white', fontSize: 10 }}>2x Fast</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={(onPress)}>
      <Image
        source={IMAGES_MOCKS.repeatIcon}
        style={{ height: 15, width: 15, resizeMode: 'contain' }}
      />
      <Text style={{ color: 'white', fontSize: 10 }}>Restart</Text>
    </TouchableOpacity>
  </View>
);

const RecordingButton = ({ onPress }) => (
  <TouchableOpacity
    onPress={(onPress)}
    style={{
      marginTop: 10,
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Image
      source={IMAGES_MOCKS.microphoneIcon}
      style={{ height: 60, width: 60, resizeMode: 'contain' }}
    />
  </TouchableOpacity>
);
