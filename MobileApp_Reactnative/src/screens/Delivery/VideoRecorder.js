import React, { useState, useEffect, useRef } from 'react';
import { Button, Text, Header, Body, Icon, Title, Spinner } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Image, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import { Camera } from 'expo-camera';
import delay from 'delay';
import shortid from 'shortid';
import SegmentedControlTabs from "react-native-segmented-control-tabs";
import DeliverySettings from "../../components/DeliverySettings";
// import { Context as TaskContext } from '../../context/taskContext';
import { connect } from 'react-redux'

const window = Dimensions.get('window');
const ratio = window.width / 421;

class RedirectTo extends React.Component {
  componentDidMount() {
    const { scene, navigation, recordedUri, isReplay } = this.props;
    navigation.navigate(scene, {
      record: { recordedUri, isReplay }
    });
  }

  render() {
    return <View />;
  }
}

const printChronometer = seconds => {

  const minutes = Math.floor(seconds / 60);
  const remseconds = seconds % 60;
  return '' + (minutes < 10 ? '0' : '') + minutes + ':' + (remseconds < 10 ? '0' : '') + remseconds;
};

const VideoRecorder = ({ navigation, task }) => {
  const interval = useRef()
  // const { state } = useContext(TaskContext);

  const [hasCameraPermission, setCameraPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.front)
  const [recording, setRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const [recordUri, setRecordUri] = useState(null)
  const [redirect, setRedirect] = useState(false)
  const [scrollText, setScrollText] = useState('This text is set under a ScrollView.\n\n The ScrollView is a generic scrolling container that can contain multiple components and views. \n\n The scrollable items need not be homogeneous, and you can scroll both vertically and horizontally (by setting the horizontal property).')
  const [showModal, setShowModal] = useState(false)
  const [camera, setCameraRef] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(0)
  const scrollViewRef = useRef(null);
  const [scrollViewHeight, setScrollViewHeight] = useState(0)
  const [deliverySettings, setDeliverySettings] = useState({
    font: 24,
    theme: 'blue',
    background: 'plain',
    speed: 10.00,
    autocueStatus: true
  })

  //settings
  const [font, setFont] = useState(24 * ratio)
  const [theme, setThemeDelivery] = useState('blue');
  const [bgColor, setBgColorDelivery] = useState('plain');
  const [autocueStatus, setAutocueStatusDelivery] = useState(true);
  const [autocueSpeedDelivery, setAutocueSpeedDelivery] = useState(10.00);

  useEffect(() => {
    _askForPermissions();
  }, [])

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

  const _askForPermissions = async () => {
    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA)
    const { status: audioStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    setCameraPermission(cameraStatus === 'granted' && audioStatus === 'granted')
  }

  const scrolling = () => {
    if (scrollViewRef.current) {
      setCurrentPosition(position => position + deliverySettings.speed)
    }
  }


  // useEffect(() => {
  //   console.log("font before update = ",font)

  // try{
  // if(state.deliverySettingsResponse.deliverySettings.font !== font || state.deliverySettingsResponse.deliverySettings.theme !== theme || state.deliverySettingsResponse.deliverySettings.backgroud !== bgColor || state.deliverySettingsResponse.deliverySettings.speed !== autocueSpeedDelivery || state.deliverySettingsResponse.deliverySettings.autocueStatus !== autocueStatus ) {

  //   console.log("updated settings in recorder = ",state.deliverySettingsResponse.deliverySettings);
  //   const font_recorder = state.deliverySettingsResponse.deliverySettings.font
  //   console.log("Settings updated = ",font_recorder);
  //   setFont(font_recorder*ratio)
  //   setThemeDelivery(state.deliverySettingsResponse.theme)
  //   setBgColorDelivery(state.deliverySettingsResponse.backgroud)
  //   setAutocueSpeedDelivery(state.deliverySettingsResponse.speed)
  //   setAutocueStatusDelivery(state.deliverySettingsResponse.autocueStatus)

  // } 
  //   }catch(err) {
  //       console.log("error in recorder state = ",err)
  //   }
  // }, [state])

  const registerRecord = async () => {

    if (recording) {
      await delay(1000);
      setDuration(duration + 1)
      registerRecord();
    }
  }

  const startRecording = async () => {
    debugger;
    if (!camera) {
      return;
    }
    await setRecording(true);
    registerRecord();
    const recordingConfig = { quality: Camera.Constants.VideoQuality['420p'], maxDuration: 120 };
    const record = await camera.recordAsync({ maxDuration: 20 });
    // console.log(record);
    const videoId = shortid.generate();
    console.log('videoId', videoId);

    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos/`, {
      intermediates: true
    });

    await FileSystem.moveAsync({
      from: record.uri,
      to: `${FileSystem.documentDirectory}videos/demo_${videoId}.mov`
    });

    setRecordUri(`${FileSystem.documentDirectory}videos/demo_${videoId}.mov`);
    setRedirect('ViewDelivery');

    var file = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}videos/demo_${videoId}.mov`, { md5: true, size: true });
    console.log('file = ', file)
    console.log(`${FileSystem.documentDirectory}videos/demo_${videoId}.mov`);
    const fileUri = `${FileSystem.documentDirectory}videos/demo_${videoId}.mov`;
    console.log("File uri = ", fileUri);

  }

  const stopRecording = async () => {
    if (!camera) {
      console.log("in stop = ", camera)
      return;
    }

    await camera.stopRecording();
    // console.log("recorded uri in stop = ", recordUri)
    setRecording(false);
    setDuration(0);
  }

  const toggleRecording = () => {
    if (deliverySettings.autocueStatus) {
      interval.current = setInterval(scrolling, 500);
    }
    return recording ? stopRecording() : startRecording();
  }

  const handleSelectedIndex = (index) => {

  }

  if (redirect) {
    return <RedirectTo scene={redirect} navigation={navigation} recordedUri={recordUri} isReplay={false} />;
  }

  if (hasCameraPermission === null) {
    return (
      <View style={styles.containerCenter}>
        <Spinner />
      </View>
    );
  } else if (hasCameraPermission === false) {
    return (
      <View style={styles.containerCenter}>
        <Text>No access to camera</Text>;
      </View>
    );
  } else {
    return (
      <>
        <Video
          source={{ uri: 'https://ak.picdn.net/shutterstock/videos/1025576939/preview/stock-footage-happy-asian-teen-girl-student-looking-at-camera-webcamera-making-video-call-to-distant-friend-or.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={recording}
          resizeMode={Video.RESIZE_MODE_COVER}
          isLooping={true}
          style={{
            width: '100%',
            height: '100%'
          }}
        >

          <SafeAreaView style={{
            width: '100%',
            zIndex: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <TouchableOpacity style={{ marginTop: 10 * ratio, marginLeft: 20 * ratio }} onPress={() => navigation.goBack()} >
              <Image
                style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                source={require('../../../assets/icon-close.png')}
              />
            </TouchableOpacity>

            <Camera
              style={{
                width: 89 * ratio,
                height: 158 * ratio,
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 8,
                overflow: 'hidden'
              }}
              type={type}
              ref={(ref) => {
                setCameraRef(ref)
              }}
            >
              <View style={styles.topActions}>
                {recording && (
                  <Button iconLeft transparent light small style={styles.chronometer}>

                    <Text>{printChronometer(duration)}</Text>
                  </Button>
                )}
                {!recording && <View />}
              </View>
            </Camera>

            <TouchableOpacity style={{ marginTop: 10 * ratio, marginRight: 20 * ratio }} onPress={() => setShowModal(true)}>
              <Image
                style={{ width: 25 * ratio, height: 25 * ratio, resizeMode: 'contain' }}
                source={require('../../../assets/icon-settings.png')}
              />
            </TouchableOpacity>

          </SafeAreaView>

          <ScrollView
            ref={scrollViewRef}
            //  onContentSizeChange={(contentWidth, contentHeight) => { scrollViewRef.current.scrollToEnd({ animated: true }) }}
            onContentSizeChange={(width, height) => {
              setScrollViewHeight(height - 100 * ratio)
            }}
            style={{
              zIndex: 5,
              marginBottom: 100 * ratio,
              marginLeft: 20,
              marginRight: 20
            }}
            persistentScrollbar={true}
            indicatorStyle='white' >
            {
              task && task.script.taskScriptContents && task.script.taskScriptContents.map((script, index) => {
                return <Text key={index} style={{ color: 'white', fontSize: deliverySettings.font, textAlign: 'left', width: '100%', lineHeight: 46 * ratio }}>{script.scriptFieldvalue}</Text>
              })
            }

          </ScrollView>

          <SegmentedControlTabs
            values={[
              <View>
                <Image
                  style={{ width: 18 * ratio, height: 18 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                  source={require('../../../assets/icon_slow.png')}
                />
                <Text style={{ color: '#fff', fontSize: 12 * ratio, marginTop: 5 }}>Slow</Text>
              </View>,
              <View>
                <Image
                  style={{ width: 18 * ratio, height: 18 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                  source={require('../../../assets/icon-fast-forward.png')}
                />
                <Text style={{ color: '#fff', fontSize: 12 * ratio, marginTop: 5 }}>1.5X Fast</Text>
              </View>,
              <View>
                <Image
                  style={{ width: 18 * ratio, height: 18 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                  source={require('../../../assets/icon-repeat.png')}
                />
                <Text style={{ color: '#fff', fontSize: 12 * ratio, marginTop: 5 }}>Restart</Text>
              </View>
            ]}
            handleOnChangeIndex={handleSelectedIndex}
            activeIndex={0}
            tabsContainerStyle={{
              width: '80%',
              height: 49 * window.width / 421,
              backgroundColor: 'rgba(255,255,255,0.18)',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              alignSelf: 'center',
              position: 'absolute',
              bottom: 100 * ratio,
              zIndex: 10
            }}
            lastTabStyle={{
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,

            }}
          />

          <View style={styles.bottonActions}>
            <TouchableOpacity style={{ marginBottom: 10 * ratio }} onPress={() => toggleRecording()}>
              {
                recording ?
                  <Image
                    style={{ width: 65 * ratio, height: 65 * ratio, resizeMode: 'contain' }}
                    source={require('../../../assets/icon-stop-rehearse.png')}
                  />
                  :
                  <Image
                    style={{ width: 65 * ratio, height: 65 * ratio, resizeMode: 'contain' }}
                    source={require('../../../assets/icon-record.png')}
                  />
              }
            </TouchableOpacity>
          </View>
        </Video>

        <DeliverySettings
          isVisible={showModal}
          onClose={(value) => setShowModal(value)}
          deliverySettings={deliverySettings}
          setDeliverySettings={setDeliverySettings}
        />
      </>
    );
  }
}

// export default ;

const mapStateToProps = (state) => ({
  task: state.task.task
})

export default connect(mapStateToProps, {})(VideoRecorder);

const styles = StyleSheet.create({
  topActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flipCamera: {
    margin: 10
  },
  chronometer: {
    margin: 10
  },
  bottonActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    zIndex: 5
  },
  containerCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    marginTop: 190,
    height: '40%',
    marginLeft: 30,
    marginRight: 10
  },
  containerCamera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 20
  },
  cameraContainer: {
    position: 'absolute',
    width: 120,
    height: 150,
    marginLeft: (Dimensions.get('window').width / 2) - 60,
    borderRadius: 20,
    backgroundColor: 'red',
    zIndex: 100

  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    position: 'absolute',
    width: "100%",
    height: "100%"
  }
});

