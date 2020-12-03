import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { IMAGES_MOCKS } from '../../constants/mocks';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RehersalSettings from '../../components/RehersalSettings';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux'
import { CreateFolderIfNotExist } from '../../utils/FileManager';
import { FILEPATH_AUDIO } from "../../config/Settings";
import { Audio } from 'expo-av';
import shorid from 'shortid';
import SoundCloudWaveform from 'react-native-soundcloud-waveform';

const window = Dimensions.get('window');
const { width } = Dimensions.get('screen');
const ratio = window.width / 421;

this.recording = null;
this.sound = null;

const Rehearse = ({ navigation, task }) => {

  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [state, setState] = useState(0);
  const [hasRecordPermissions, setRecordPermissions] = useState(false);
  const [durationMillis, setDurationMillis] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clipShouldReplay, shouldClipReplay] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0)
  const scrollViewRef = useRef(null);
  const interval = useRef()
  const [scrollViewHeight, setScrollViewHeight] = useState(0)
  const [deliverySettings, setDeliverySettings] = useState({
    font: 24,
    theme: 'blue',
    background: 'plain',
    speed: 10.00,
    autocueStatus: true
  })

  let filePath = FileSystem.documentDirectory + FILEPATH_AUDIO;
  const recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));

  useEffect(() => {
    requestPermissions();
    updateFilePath();
    getAudioFiles();
  }, []);

  useEffect(() => {

    return () => {
      clearInterval(interval.current);
    };
  }, [scrollViewHeight]);


  useEffect(() => {
    if (scrollViewRef.current) {
      let maxOffset = scrollViewHeight

      scrollViewRef.current.scrollTo({ y: currentPosition, animated: true });
      debugger
      if (currentPosition > maxOffset) {
        clearInterval(interval.current);
      }
    }
  }, [currentPosition, scrollViewHeight])

  const scrolling = () => {
    if (scrollViewRef.current) {
      setCurrentPosition(position => position + deliverySettings.speed)
    }
  }

  const updateFilePath = () => {
    const { taskId } = task;
    filePath = filePath + '/' + taskId;
  }

  // request permission from user to record audio
  const requestPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    setRecordPermissions(response.status === 'granted')
  };

  const getAudioFiles = async () => {
    const { taskId } = task;

    try {
      await CreateFolderIfNotExist(`${FILEPATH_AUDIO}/${taskId}`);
      const files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}${FILEPATH_AUDIO}/${taskId}`);
      setFiles(files)

    } catch (err) {
      console.log("Error while extracting audios files ", err)
      setAudios([])
    }
  }

  const getMMSSFromMillis = (millis) => {
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

  const getRecordingTimestamp = (value) => {
    return `${getMMSSFromMillis(value)}`;
  }

  const onHandleAudioClipPress = (index) => {
    const { taskId } = task;

    setState(2);
    this.recording = `${FileSystem.documentDirectory}${FILEPATH_AUDIO}/${taskId}/${files[index]}`;
    this.sound = null;
    setDurationMillis(files[index].split('_demo_')[0])
    shouldClipReplay(true);
  }

  const onHandleSaveRecording = async () => {
    const { taskId } = task;

    if (isPlaying) {
      this.sound.pauseAsync();
      setIsPlaying(false);
    }

    try {
      if (clipShouldReplay) {
        Alert.alert("Alert", "Your recording is already saved.", [
          {
            text: "OK",
            onPress: () => null
          }
        ]);
      } else {
        try {

          const audioId = shorid.generate();
          // await FileSystem.makeDirectoryAsync(`${filePath}/`, {
          //   intermediates: true
          // });

          await FileSystem.moveAsync({
            from: this.recording._uri,
            to: `${FileSystem.documentDirectory}${FILEPATH_AUDIO}/${taskId}/${durationMillis}_demo_${audioId}.caf`
          }).then(() => {
            getAudioFiles();
            Alert.alert("Alert", "Your recording has been saved.", [
              {
                text: "OK",
                onPress: () => setState(0)
              }
            ]);
          });

        } catch (err) {
          console.log("error storing nonReplay audio = ", err)
        }
      }
    } catch (err) {
      console.log("error in keep video = ", err)
    }

  }

  const onHandleBackPressed = async () => {
    if (state === 2) {
      setDurationMillis(0);
      // await FileSystem.deleteAsync(this.recording);
      this.recording = null;
      this.sound = null;
      setState(0);
      shouldClipReplay(false);
    } else {
      setState(state - 1);
    }
  }

  const deleteRecording = async () => {
    if (isPlaying) {
      this.sound.pauseAsync();
      setIsPlaying(false);
    }

    try {
      if (state === 2 && clipShouldReplay) {
        await FileSystem.deleteAsync(this.recording).then((res) => {
          getAudioFiles();
          Alert.alert("Alert", "Your recording has been deleted.", [
            {
              text: "OK",
              onPress: () => setState(0)
            }
          ]);
        }).catch((err) => {
          console.log("Error deleting = ", err)
        })
      } else {
        Alert.alert("Alert", "You cannot delete a recording which is not saved.", [
          {
            text: "OK",
            onPress: () => null
          }
        ]);
      }

    } catch (err) {
      console.log("error in delete audio = ", err);
    }
  }

  const renderHeader = () => {
    return (
      <ImageBackground source={require('../../../assets/header_bar.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', top: 0, justifyContent: 'center', }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: 20,
          marginRight: 20,
          marginTop: 45 * ratio
        }}>
          <TouchableOpacity onPress={() => state === 0 ? navigation.navigate("Task", { activeIndex: 2 }) : onHandleBackPressed()} >
            {state === 0 ? (<Image
              style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
              source={require('../../../assets/icon-close.png')}
            />)
              :
              (
                <Image
                  style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                  source={require('../../../assets/icon-back.png')}
                />
              )
            }
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 20 * ratio }}>Rehearse</Text>
          <TouchableOpacity onPress={() => setShowModal(true)} >
            <Image
              style={{ width: 25 * ratio, height: 25 * ratio, resizeMode: 'contain' }}
              source={require('../../../assets/icon-settings.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  const renderScript = () => {
    return (
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(width, height) => {
          setScrollViewHeight(height - 100 * ratio)
        }}
        style={{ flex: 0.6, height: '100%', padding: 20 }}>
        {
          task && task.script.taskScriptContents && task.script.taskScriptContents.map((script, index) => {
            return <React.Fragment key={index}>
              <Text style={[styles.text, { fontSize: deliverySettings.font }]} key={`${index}`}>{script.scriptFieldvalue}</Text>
            </React.Fragment>
          })
        }
      </ScrollView>
    );
  }

  const renderAudioClips = () => {
    return (
      <View
        style={{
          flex: 0.4,
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingBottom: 15,
        }}>
        {
          files.length !== 4 && (
            <TouchableOpacity
              onPress={() => setState(1)}
              style={{
                height: 95,
                marginLeft: '3.5%',
                width: 65,
                backgroundColor: '#284e75',
                borderRadius: 5,
                padding: 5,
                justifyContent: 'center',
                borderWidth: 2,
                borderStyle: 'dashed',
                borderColor: 'white',
                alignItems: 'center',
              }}>
              <AntDesign
                name="plus"
                size={32}
                color="white"
                style={{ alignSelf: 'center' }}
              />
            </TouchableOpacity>
          )
        }

        {
          files.map((file, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  height: 95,
                  marginLeft: '3.5%',
                  width: 65,
                  backgroundColor: '#88a1b8',
                  borderRadius: 5,
                  padding: 5,
                  justifyContent: 'space-between',
                }}
                onPress={() => onHandleAudioClipPress(index)}
              >
                <Text style={{ fontSize: 12, color: 'white' }}>{index + 1}</Text>
                <SimpleLineIcons
                  name="volume-2"
                  size={32}
                  color="white"
                  style={{ alignSelf: 'center' }}
                />
                <Text style={{ fontSize: 12, color: 'white', textAlign: 'right' }}>{getRecordingTimestamp(file.split('_demo_')[0])}</Text>
              </TouchableOpacity>
            )
          })
        }

      </View>
    );
  }

  const renderRecordingControls = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 10,
          marginBottom: 10
        }}>
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
            onPress={() => null}>
            <Image
              source={IMAGES_MOCKS.repeatIcon}
              style={{ height: 15, width: 15, resizeMode: 'contain' }}
            />
            <Text style={{ color: 'white', fontSize: 10 }}>Restart</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.recordingTimestamp, { opacity: isRecording ? 1.0 : 0.0 }]}>
            {getRecordingTimestamp(durationMillis)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => onHandleRecordPressed()}
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
      </View>
    );
  }

  const renderPlaybackControls = () => {
    const setTime = () => { };

    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginHorizontal: 20,
          marginTop: 10,
          marginBottom: 10
        }}>
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
            onPress={() => onHandleSaveRecording()}>
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
            onPress={() => deleteRecording()}>
            <Image
              source={IMAGES_MOCKS.deleteIcon}
              style={{ height: 15, width: 15, resizeMode: 'contain' }}
            />
            <Text style={{ color: 'white', fontSize: 10 }}>Delete</Text>
          </TouchableOpacity>

        </View>

        <View
          style={{
            height: 50,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 10
          }}>
          <TouchableOpacity style={{ flex: 0.15, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => onPlayPausePressed()}>
            {
              isPlaying ?
                <Image
                  style={{ width: 20, height: 20, resizeMode: 'contain', alignSelf: 'center', }}
                  source={require('../../../assets/icon-pause.png')}
                />
                :
                <Image
                  style={{ width: 20, height: 20, resizeMode: 'contain', alignSelf: 'center', }}
                  source={require('../../../assets/icon-play-player.png')}
                />
            }
          </TouchableOpacity>
          <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
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
          <View style={{ flex: 0.15, flexDirection: 'row', height: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ color: 'white', textAlignVertical: 'auto' }}>{getRecordingTimestamp(durationMillis)}</Text>
          </View>
        </View>
      </View>
    );
  }

  const onPlayPausePressed = async () => {
    if (this.sound != null) {
      try {
        if (isPlaying) {
          this.sound.pauseAsync();
          setIsPlaying(false)
        } else {
          this.sound.playAsync();
          setIsPlaying(true)
        }
      } catch (err) {
        console.log("error in playpause = ", err)
      }
    } else {

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

  const _updateScreenForSoundStatus = async status => {
    // if (isLoading) {
    // this.setState({
    //   soundDuration: status.durationMillis,
    //   soundPosition: status.positionMillis,
    //   shouldPlay: status.shouldPlay,
    //   isPlaying: status.isPlaying,
    //   rate: status.rate,
    //   muted: status.isMuted,
    //   volume: status.volume,
    //   shouldCorrectPitch: status.shouldCorrectPitch,
    //   isPlaybackAllowed: true,
    // });
    // } else {
    //   this.setState({
    //     soundDuration: null,
    //     soundPosition: null,
    //     isPlaybackAllowed: false,
    //   });
    if (status.error) {
      console.log(`FATAL PLAYER ERROR: ${status.error}`);
    }
  }

  const _updateScreenForRecordingStatus = async status => {
    const { canRecord, durationMillis, isDoneRecording } = status;

    if (canRecord && !isRecording) {
      setIsRecording(true);
    } else if (isDoneRecording && isDoneRecording) {
      setIsRecording(false);
      if (!isLoading) {
        _stopRecordingAndEnablePlayback();
      }
    }

    setDurationMillis(durationMillis);
  };

  const _stopPlaybackAndBeginRecording = async () => {

    setIsLoading(true);
    shouldClipReplay(false);

    try {
      if (this.sound !== null && this.sound !== undefined) {
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
      if (this.recording !== null && this.recording !== undefined) {
        // this.recording.setOnRecordingStatusUpdate(null);
        this.recording = null;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingSettings);
      recording.setProgressUpdateInterval(1000);
      recording.setOnRecordingStatusUpdate(_updateScreenForRecordingStatus);

      this.recording = recording;
      await this.recording.startAsync();

      setIsLoading(false);
    }
    catch (e) {
      console.log('ssdsds', e)
    }
  }

  const _stopRecordingAndEnablePlayback = async () => {
    setIsLoading(true);
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());

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
        isMuted: false,
        volume: 1.0,
        rate: 1.0,
        shouldCorrectPitch: true
      },
      _updateScreenForSoundStatus
    );
    this.sound = sound;
    setIsLoading(false);
    setState(2);
  }

  const onHandleRecordPressed = async () => {

    if (isRecording) {
      _stopRecordingAndEnablePlayback();
      clearInterval(interval.current);
    } else {
      _stopPlaybackAndBeginRecording();
      if (deliverySettings.autocueStatus) {
        interval.current = setInterval(scrolling, 500);
      }
    }
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#28679b',
      }}>

      {renderHeader()}
      {renderScript()}
      {state === 0 && renderAudioClips()}
      {state === 1 && renderRecordingControls()}
      {state === 2 && renderPlaybackControls()}

      <RehersalSettings
        isVisible={showModal}
        onClose={(value) => setShowModal(value)}
        deliverySettings={deliverySettings}
        setDeliverySettings={setDeliverySettings}
      />
    </View>
  );
}

Rehearse['navigationOptions'] = ({ navigation }) => {
  const openModal = navigation.getParam('openModal');
  return {
    headerTitle: 'Rehearse',
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
      <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => navigation.goBack()}>
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

const mapStateToProps = (state) => ({
  task: state.task.task
})

export default connect(mapStateToProps, {})(Rehearse);


const styles = StyleSheet.create({
  text: { fontSize: 30 * ratio, lineHeight: 46 * ratio, color: 'white', paddingBottom: 20 },
  backgroundImage: {
    width: window.width,
    height: 89 * window.width / 414
  },
  recordingTimestamp: {
    color: 'white',
    alignSelf: 'center'
  },
});
