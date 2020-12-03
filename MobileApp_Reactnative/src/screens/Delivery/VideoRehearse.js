import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ImageBackground,
  Dimensions
} from 'react-native';
import { IMAGES_MOCKS } from '../../constants/mocks';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeliverySettings from "../../components/DeliverySettings";
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
// import Storage from '../../api/Storage';
// import { Context as TaskContext } from '../../context/taskContext';
import { connect } from 'react-redux'
import { CreateFolderIfNotExist } from '../../utils/FileManager';
import { VIDEO_ACTION, SCRIPT_ACTION } from '../../constants/enum'


const window = Dimensions.get('window');
const ratio = window.width / 421;
// const DATA = {
//   key: 0,
//   title: 'A new product launch planned- Kozak celebration day',
//   description: 'Hi Diane, it was great seeing you on Friday for the Khor vodka tasting - You were ripped by the end! In your inventory for May, you have a wonderful opportunity to send them to Ukraine when the weather is beautiful and the vodka flows like water Perhaps you could consider sending your groups to Ukraine How about we give you a bonus if you send 20 groups', datetime: '21st Feb 2020',
//   likes: 5,
//   shares: 1,
//   uri: 'http://techslides.com/demos/sample-videos/small.mp4'
// };
const filePath = FileSystem.documentDirectory + 'videos';

const VideoRehearse = ({ navigation, task }) => {

  // const { state } = useContext(TaskContext);

  const [showModal, setShowModal] = useState(false);
  const [videos, setVideos] = useState([]);
  const [font, setFont] = useState(24 * ratio)
  const [theme, setThemeDelivery] = useState('blue');
  const [bgColor, setBgColorDelivery] = useState('plain');
  const [autocueStatus, setAutocueStatusDelivery] = useState(true);
  const [autocueSpeedDelivery, setAutocueSpeedDelivery] = useState(10.00);
  // const [totalVideos, setTotalVideos] = useState(0);

  useEffect(() => {

    // (async () => {

    //   try {
    //     const videos = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}videos/`);

    //     // for (let i=0; i<videos.length; i++) {
    //     //   await FileSystem.deleteAsync(`${FileSystem.documentDirectory}videos/${videos[i]}`).then(res => {
    //     //     console.log("deleted = ", res)
    //     //   })
    //     // }
    //     // console.log("retrived video duration = ", videos[0].split('_demo_')[0])
    //     // console.log("retrived videos = ", videos.reverse());
    //     // console.log("total videos = ", videos.length)
    //     // setTotalVideos(videos.length)
    //     // setVideos(videos.reverse());
    //   } catch (err) {
    //     console.log("Error getting recorded videos = ", err)
    //   }
    // })();
    // console.log("Font size = ", font);
    getVideoFiles();
  }, [])

  const getVideoFiles = async () => {
    try {
      await CreateFolderIfNotExist('videos');
      const files = await FileSystem.readDirectoryAsync(filePath);

      setVideos(files.reverse())

    } catch (err) {
      console.log("Error while extracting audios files ", err)
      setVideos([])
    }
  }

  // useEffect(() => {


  //   try {
  //     if (state && state.deliverySettingsResponse.deliverySettings.font !== font || state && state.deliverySettingsResponse.deliverySettings.theme !== theme || state && state.deliverySettingsResponse.deliverySettings.backgroud !== bgColor || state && state.deliverySettingsResponse.deliverySettings.speed !== autocueSpeedDelivery || state && state.deliverySettingsResponse.deliverySettings.autocueStatus !== autocueStatus) {

  //       // console.log("updated settings in rehearse = ",state.deliverySettingsResponse.deliverySettings);
  //       const font_rehearse = state.deliverySettingsResponse.deliverySettings.font
  //       // console.log("Settings updated = ",font_rehearse);
  //       setFont(font_rehearse * ratio)
  //       setThemeDelivery(state.deliverySettingsResponse.theme)
  //       setBgColorDelivery(state.deliverySettingsResponse.backgroud)
  //       setAutocueSpeedDelivery(state.deliverySettingsResponse.speed)
  //       setAutocueStatusDelivery(state.deliverySettingsResponse.autocueStatus)

  //     }
  //   } catch (err) {
  //     console.log("error in rehearse state = ", err)
  //   }
  // }, [state])

  return (
    <>
      <View style={styles.container} >
        <ImageBackground source={require('../../../assets/header_bar.png')} style={styles.backgroundImage} imageStyle={{ resizeMode: 'contain', top: 0, justifyContent: 'center', }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 45 * ratio
          }}>
            <TouchableOpacity onPress={() => navigation.navigate("Task", { activeIndex: 2 })} >
              <Image
                style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                source={require('../../../assets/icon-close.png')}
              />
            </TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 20 * ratio }}>Deliver</Text>
            <TouchableOpacity onPress={() => setShowModal(true)} >
              <Image
                style={{ width: 25 * ratio, height: 25 * ratio, resizeMode: 'contain' }}
                source={require('../../../assets/icon-settings.png')}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ScrollView style={{ height: '100%', padding: 20, backgroundColor: '#28679b', fontSize: 60 }} >

          {
            task && task.script.taskScriptContents && task.script.taskScriptContents.map((script, index) => {
              return <Text style={styles.text} key={index}>{script.scriptFieldvalue}</Text>
            })
          }
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            position: 'absolute',
            bottom: 40,
            left: 20
          }}>
          {videos.length > 0 && <RehearsedVideoSelected navigation={navigation} recordedUri={`${FileSystem.documentDirectory}videos/${videos[0]}`} duration={videos[0].split('_demo_')[0]} isReplay={true} />}
          {videos.length > 1 && <RehearsedVideoSelected navigation={navigation} recordedUri={`${FileSystem.documentDirectory}videos/${videos[1]}`} duration={videos[1].split('_demo_')[0]} isReplay={true} />}
          {
            task && (task.lastScriptAction.action === SCRIPT_ACTION.SCRIPT_APPROVED && task.lastVideoAction.action !== VIDEO_ACTION.VIDEO_APPROVED) &&
            <RehearsedVideoNew onPress={() => navigation.navigate("VideoRecorder")} videolength={videos.length} />
          }
          {videos.length > 2 && <RehearsedVideoSelected navigation={navigation} recordedUri={`${FileSystem.documentDirectory}videos/${videos[2]}`} duration={videos[2].split('_demo_')[0]} isReplay={true} />}
          {videos.length > 3 && <RehearsedVideoSelected navigation={navigation} recordedUri={`${FileSystem.documentDirectory}videos/${videos[3]}`} duration={videos[3].split('_demo_')[0]} isReplay={true} />}

        </View>
      </View>
      <DeliverySettings isVisible={showModal} onClose={(value) => setShowModal(value)} />
    </>
  );
};

VideoRehearse['navigationOptions'] = ({ navigation }) => {
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

// export default ;

const mapStateToProps = (state) => ({
  task: state.task.task
})

export default connect(mapStateToProps, {})(VideoRehearse);

const styles = StyleSheet.create({
  text: { fontSize: 30 * ratio, lineHeight: 46 * ratio, color: 'white', paddingBottom: 20 },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E1EEFE',
  },
  backgroundImage: {
    width: window.width,
    height: 89 * window.width / 414
  },
});

const RehearsedVideoSelected = ({ navigation, recordedUri, duration, isReplay }) => {

  return (
    <TouchableOpacity
      style={{
        height: 100 * ratio,
        marginLeft: '3.5%',
        width: 65 * ratio,
        backgroundColor: '#88a1b8',
        borderRadius: 8,
        justifyContent: 'space-between',
      }}
      onPress={() => {
        console.log(" Replay = ", isReplay, recordedUri)
        // navigation.navigate("viewDelivery")
        navigation.navigate("ViewDelivery", {
          record: { recordedUri, isReplay }
        });
      }}
    >
      <Video
        source={{ uri: recordedUri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        style={{ width: 65 * ratio, height: 100 * ratio, borderRadius: 8 }}
      >
        <View style={{ zIndex: 10, justifyContent: 'center', flex: 1 }}>
          <Image
            style={{ width: 23 * ratio, height: 23 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
            source={require('../../../assets/icon-play.png')}
          />
        </View>
        <Text style={{ fontSize: 12, color: 'white', textAlign: 'right', fontWeight: 'bold', zIndex: 10, position: 'absolute', bottom: 5, right: 5 }}>{duration}</Text>
      </Video>
    </TouchableOpacity>);
}

const RehearsedVideoNew = ({ onPress, navigation, videolength }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={videolength >= 4}
    style={{
      height: 100 * ratio,
      marginLeft: '3.5%',
      width: 65 * ratio,
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
      size={23 * ratio}
      color="white"
      style={{ alignSelf: 'center' }}
    />
  </TouchableOpacity>
);
