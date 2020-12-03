import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { IMAGES_MOCKS } from '../../constants/mocks';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RehersalSettings from '../../components/RehersalSettings';
import * as FileSystem from 'expo-file-system';
import { connect } from 'react-redux'
import { CreateFolderIfNotExist } from '../../utils/FileManager';

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Rehearse = ({ navigation, task }) => {

  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([]);
  const filePath = FileSystem.documentDirectory + 'rehearse';

  useEffect(() => {
    navigation.setParams({
      openModal: () => {
        setShowModal(true);
      },
    });
    getAudioFiles();
  }, []);

  const getAudioFiles = async () => {
    try {
      await CreateFolderIfNotExist('rehearse');
      const files = await FileSystem.readDirectoryAsync(filePath);

      setFiles(files.reverse())

    } catch (err) {
      console.log("Error while extracting audios files ", err)
      setAudios([])
    }
  }

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
          <TouchableOpacity onPress={() => navigation.navigate("Task", { activeIndex: 2 })} >
            <Image
              style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
              source={require('../../../assets/icon-close.png')}
            />
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
      <ScrollView style={{ flex: 0.6, height: '100%', padding: 20 }}>
        {
          task && task.script.taskScriptContents && task.script.taskScriptContents.map((script, index) => {
            return <Text style={styles.text} key={index}>{script.scriptFieldvalue}</Text>
          })
        }
      </ScrollView>
      <View
        style={{
          flex: 0.4,
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingBottom: 15,
        }}>
        {/* { videos.length > 0 && <RehearsedVideoSelected navigation={navigation} recordedUri={`${FileSystem.documentDirectory}videos/${videos[0]}`} duration={videos[0].split('_demo_')[0]} isReplay={ true }/> } */}

        {files.length > 0 && <PickerPickedButton navigation={navigation} recordingStop={`${filePath}/${files[0]}`} timeStamp={files[0].split('_demo_')[0]} sound={null} isReplay={true} />}
        {files.length > 1 && <PickerPickedButton navigation={navigation} recordingStop={`${filePath}audios/${files[1]}`} timeStamp={files[1].split('_demo_')[0]} sound={null} isReplay={true} />}
        <PickerButton onPress={() => navigation.push('Recording', { taskScriptContents: task && task.script.taskScriptContents })} audioLength={files.length} />
        {files.length > 2 && <PickerPickedButton navigation={navigation} recordingStop={`${filePath}audios/${files[2]}`} timeStamp={files[2].split('_demo_')[0]} sound={null} isReplay={true} />}
        {files.length > 3 && <PickerPickedButton navigation={navigation} recordingStop={`${filePath}audios/${files[3]}`} timeStamp={files[3].split('_demo_')[0]} sound={null} isReplay={true} />}

      </View>
      <RehersalSettings
        isVisible={showModal}
        onClose={(value) => setShowModal(value)}
      />
    </View>
  );
};

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

// export default ;

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
});

const PickerPickedButton = ({ navigation, recordingStop, timeStamp, sound, isReplay }) => (

  <TouchableOpacity
    style={{
      height: 95,
      marginLeft: '3.5%',
      width: 65,
      backgroundColor: '#88a1b8',
      borderRadius: 5,
      padding: 5,
      justifyContent: 'space-between',
    }}
    onPress={() => {
      navigation.push("AudioPlayback", {
        audio: { recordingStop, timeStamp, sound, isReplay }
      })
    }}
  >
    <Text style={{ fontSize: 12, color: 'white' }}>1</Text>
    <SimpleLineIcons
      name="volume-2"
      size={32}
      color="white"
      style={{ alignSelf: 'center' }}
    />
    <Text style={{ fontSize: 12, color: 'white', textAlign: 'right' }}>{timeStamp}</Text>
  </TouchableOpacity>
);
const PickerButton = ({ onPress, audioLength }) => (

  <TouchableOpacity
    onPress={onPress}
    disabled={audioLength >= 4}
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
);
