import React, { useRef, useContext, useEffect } from 'react';
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

export default class VideoRecorder extends React.Component {
  // static navigationOptions = {
  //   header: () => (
  //     <Header>
  //       <Body>
  //         <Title>My videos</Title>
  //       </Body>
  //     </Header>
  //   )
  // };
  constructor(props) {
    super(props);

    // this.record = null;
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      recording: false,
      duration: 0,
      recordUri: null,
      redirect: false,
      scrollText: 'This text is set under a ScrollView.\n\n The ScrollView is a generic scrolling container that can contain multiple components and views. \n\n The scrollable items need not be homogeneous, and you can scroll both vertically and horizontally (by setting the horizontal property).',
      showModal: false
    };
  }

  async componentDidMount() {
    const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA)
    const { status: audioStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasCameraPermission: cameraStatus === 'granted' && audioStatus === 'granted' });
  }

  async registerRecord() {
    const { recording, duration } = this.state;

    if (recording) {
      await delay(1000);
      this.setState(state => ({
        ...state,
        duration: state.duration + 1
      }));
      this.registerRecord();
    }
  }

  async startRecording() {
    if (!this.camera) {
      return;
    }
    await this.setState(state => ({ ...state, recording: true }));
    this.registerRecord();
    const recordingConfig = { quality: Camera.Constants.VideoQuality['420p'], maxDuration: 120 };
    const record = await this.camera.recordAsync({ maxDuration: 20 });
    console.log(record);
    const videoId = shortid.generate();

    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos/`, {
      intermediates: true
    });

    await FileSystem.moveAsync({
      from: record.uri,
      to: `${FileSystem.documentDirectory}videos/demo_${videoId}.mov`
    });

    var file = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}videos/demo_${videoId}.mov`, { md5: true, size: true });
    console.log('file = ', file)
    console.log(`${FileSystem.documentDirectory}videos/demo_${videoId}.mov`);
    const fileUri = `${FileSystem.documentDirectory}videos/demo_${videoId}.mov`;
    console.log("File uri = ", fileUri);
    this.setState(state => ({ ...state, redirect: 'ViewDelivery', recordUri: fileUri }));
  }

  async stopRecording() {

    if (!this.camera) {
      console.log("in stop = ", this.camera)
      return;
    }

    await this.camera.stopRecording();

    this.setState(state => ({ ...state, recording: false, duration: 0 }));
    // this.props.navigation.navigate("ViewDelivery", {
    //   uri: { url }
    // })

  }

  toggleRecording() {
    const { recording } = this.state;

    return recording ? this.stopRecording() : this.startRecording();
  }

  handleSelectedIndex(index) {

  }

  render() {
    const { hasCameraPermission, recording, duration, redirect, recordUri } = this.state;

    if (redirect) {
      return <RedirectTo scene={redirect} navigation={this.props.navigation} recordedUri={recordUri} isReplay={false}/>;
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
            shouldPlay={this.state.recording}
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
              <TouchableOpacity style={{ marginTop: 10 * ratio, marginLeft: 20 * ratio }} onPress={() => this.props.navigation.goBack()} >
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
                type={this.state.type}
                ref={(ref) => {
                  this.camera = ref;
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

              <TouchableOpacity style={{ marginTop: 10 * ratio, marginRight: 20 * ratio }} onPress={() => this.setState({ showModal: true })}>
                <Image
                  style={{ width: 25 * ratio, height: 25 * ratio, resizeMode: 'contain' }}
                  source={require('../../../assets/icon-settings.png')}
                />
              </TouchableOpacity>

            </SafeAreaView>

            <ScrollView
              style={{
                zIndex: 5,
                marginBottom: 100 * ratio,
                marginLeft: 20,
                marginRight: 20
              }}
              persistentScrollbar={true}
              indicatorStyle='white' >
              <Text style={{ color: 'white', fontSize: 30 * ratio, textAlign: 'left', width: '100%', lineHeight: 46 * ratio }}>{this.state.scrollText}</Text>
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
              handleOnChangeIndex={this.handleSelectedIndex}
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
              <TouchableOpacity style={{ marginBottom: 10 * ratio }} onPress={() => this.toggleRecording()}>
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

          <DeliverySettings isVisible={this.state.showModal} onClose={(value) => this.setState({ showModal: value })} />
        </>
      );
    }
  }
}

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

