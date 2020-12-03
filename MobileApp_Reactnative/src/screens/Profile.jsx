import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux'
import { verticalScale, scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileCard from '../components/Profile/ProfileCard';
import { IMAGES_MOCKS } from '../constants/mocks';
import FullScreenLoader from "../components/FullScreenLoader";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import axios from "axios";
import { Buffer } from 'buffer'
import { getProfileAPI } from '../store/actions/profile'
import { showUnauthMessage } from '../utils/handlePermission'
import ActionSheet from 'react-native-actionsheet'
import Settings, { AZURE_BLOB_SAS_TOKEN } from '../config/Settings';
import Storage from '../api/Storage';
import { logout } from "../store/actions/user";
import { axiosInstance } from '../api/Services';
import CameraView from '../components/Camera';

const CommonInput = ({ text, placeholder }) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: verticalScale(50),
        borderRadius: scale(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{ flex: 0.5, alignItems: 'flex-end', paddingRight: 10 }}>
        <Text style={{ fontSize: scale(15), color: '#5c6a7f' }}>{text}</Text>
      </View>
      <View style={{ flex: 0.5 }}>
        <TextInput
          editable={false}
          placeholder={placeholder}
          numberOfLines={5}
          placeholderTextColor={'#1469af'}
          style={{ color: '#1469af', fontSize: scale(15) }}
        />
      </View>
    </View>
  );
};

const window = Dimensions.get('window');
const ratio = window.width / 421;

this.ActionSheet = null;

const Profile = ({ navigation, getProfileAPI, profile, logout, userLoading, userStatus, loading, error }) => {

  const [isFetching, shouldFetch] = useState(false);
  const [profilePictureUri, setProfilePictureUri] = useState(null);
  const [isProfilePictureUploading, shouldProfilePictureUpload] = useState(true);
  const [type, setType] = useState(null);
  const [hasCameraRollPermission, setCameraRollPermission] = useState(null);
  const [hasGalleryPermission, setGalleryPermission] = useState(null);

  useEffect(() => {
    getCameraPermissionAsync()
    getGalleryPermissionAsync()
    getProfileAPI()
  }, [])

  const getCameraPermissionAsync = async () => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setCameraRollPermission(status === 'granted');
  };

  const getGalleryPermissionAsync = async () => {

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    setGalleryPermission(status === 'granted');
  };

  const showPhotoUploadOptions = () => {
    this.ActionSheet.show()
  }

  const pickImage = async () => {

    try {

      if (!hasGalleryPermission) {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      shouldProfilePictureUpload(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {

        const filename = result.uri.split('/').pop();
        const responseUpload = await uploadFileToAzureBlobStorgae(result.uri, filename);

        if (responseUpload.status === 201) {

          const fileUrl = `${Settings.AZURE_PROFILEPICTURE_CONTAINER}/${filename}`;
          let response = await updateUserPictureToAuth0(fileUrl);
          const user = await Storage.get('user');
          user.picture = response.data.user_metadata.picture;
          await Storage.set('user', user);
          setProfilePictureUri(result.uri);
          shouldProfilePictureUpload(false);
        }
        else {
          // error in uploadFileToAzureBlobStorgae method
          shouldProfilePictureUpload(false);
        }

      }
      else {
        shouldProfilePictureUpload(false);
      }

    } catch (E) {
    }
  };

  const takeImage = async (result) => {
    try {

      if (!hasCameraRollPermission) {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      setType(null);

      const filename = result.uri.split('/').pop();
      const responseUpload = await uploadFileToAzureBlobStorgae(result.uri, filename);

      if (responseUpload.status === 201) {

        const fileUrl = `${Settings.AZURE_PROFILEPICTURE_CONTAINER}/${filename}`;
        let response = await updateUserPictureToAuth0(fileUrl);

        const user = await Storage.get('user');
        user.picture = response.data.user_metadata.picture;
        await Storage.set('user', user);
        setProfilePictureUri(result.uri);
        shouldProfilePictureUpload(false);
      }
      else {
        // error in uploadFileToAzureBlobStorgae method
        shouldProfilePictureUpload(false);
      }
    }
    catch (error) {
      console.log('takeImage error - ', error);
    }
  }

  const uploadFileToAzureBlobStorgae = async (fileUri, filename) => {

    try {
      const sasURi = `${Settings.AZURE_PROFILEPICTURE_CONTAINER}/${filename}?${Settings.AZURE_BLOB_SAS_TOKEN}`;

      let match = /\.(\w+)$/.exec(filename);
      const fileType = match ? `image/${match[1]}` : `image`;

      var date = new Date();
      var currentDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay();

      const options = {
        encoding: FileSystem.EncodingType.Base64
      };
      const fileBase64 = await FileSystem.readAsStringAsync(fileUri, options);
      const buffer = Buffer.from(fileBase64, 'base64');

      const response = await axios.put(sasURi, buffer, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, x-ms-*",
          'x-ms-blob-content-type': fileType,
          "x-ms-date": currentDate,
          "x-ms-version": '2017-11-09',
          "x-ms-blob-type": "BlockBlob",
          'content-type': 'application/octet-stream',
        }
      })
        .then(response => {
          return {
            status: response.status
          }
        })
        .catch(error => {
          return {
            status: 400,
            error: error
          }
        });

      return response;

    } catch (err) {
      return {
        status: 400,
        error: err
      }
    }
  }

  const updateUserPictureToAuth0 = async (picture) => {
    return new Promise(async (resolve, reject) => {

      try {
        const { sub } = await Storage.get('user') || null;
        const { access_token } = await Storage.get('token') || null;

        await axios.patch(`${Settings.AUTH_URL}/api/v2/users/${sub}`,
          {
            user_metadata: {
              picture: picture
            }
          },
          { headers: { Authorization: `Bearer ${access_token}` } })
          .then(async response => {

            let data = {
              data: response.data,
              status: response.status
            }
            resolve(data);
          });

      } catch (err) {
        console.log('updateUserPictureToAuth0 error', err)
        let data = {
          data: err,
          status: 400
        }

        resolve(data);
      }
    });
  }

  const handleOnLogOut = async () => {
    try {
      logout(navigation);
    } catch (e) {
    }
  }

  const closeCamera = async () => {
    setType(null);
    shouldProfilePictureUpload(false);
  }

  const onHandleCameraTapped = async () => {
    shouldProfilePictureUpload(true);
    setType(0)
  }

  return (
    <>
      <View
        style={{
          flex: type === 0 ? 0 : 1,
          backgroundColor: '#2E9XC0',
        }}>
        <ImageBackground
          source={IMAGES_MOCKS.profileBG}
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            resizeMode: 'cover',
            justifyContent: 'center',
          }}>
          <ScrollView>
            <View
              style={{
                height: verticalScale(180),
                alignItems: 'center',
                paddingTop: verticalScale(20),
                justifyContent: 'space-around',
              }}>

              {
                <ImageBackground
                  source={{ uri: profilePictureUri ? profilePictureUri : profile.pictureUrl ? `${profile.pictureUrl}?${AZURE_BLOB_SAS_TOKEN}` : 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png' }}
                  style={{
                    width: scale(116),
                    height: scale(116),
                  }}
                  imageStyle={{ borderRadius: scale(116) / 2 }}
                  onLoad={() => shouldProfilePictureUpload(false)}
                >

                  <TouchableOpacity style={{ zIndex: 10, justifyContent: 'center', flex: 1 }} onPress={() => !isProfilePictureUploading && showPhotoUploadOptions()}>

                    {
                      isProfilePictureUploading ?
                        <ActivityIndicator size="large" color="#fff" />
                        :
                        <Image
                          style={{ width: 40 * ratio, height: 40 * ratio, resizeMode: 'contain', alignSelf: 'center', }}
                          source={require('../../assets/icon-upload.png')}
                        />
                    }
                  </TouchableOpacity>

                </ImageBackground>
              }

              {
                !loading &&
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>
                  {profile.firstName ? profile.firstName : '' + ' ' + profile.lastName ? profile.lastName : ''}
                </Text>
              }
            </View>
            <View
              style={{
                height: verticalScale(200),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ProfileCard cardColor="#0f9bff" number="5" title="Gallery Video" />
              <ProfileCard cardColor="#00b3bb" number="5" title="Task Completed" />
              <ProfileCard
                cardColor="#9771e2"
                number="5"
                title="Team Instructions"
              />
            </View>
            <View
              style={{ height: verticalScale(230), justifyContent: 'space-between' }}>
              <CommonInput text='Company' placeholder={profile.businessUnitName} />
              <CommonInput text='Mobile' placeholder={profile.phone} />
              <CommonInput text='Email' placeholder={profile.email} />
              <CommonInput text='Focus Areas' placeholder={'Sales & Marketing'} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
                height: verticalScale(100),
              }}>
              <TouchableOpacity
                onPress={handleOnLogOut}
                style={{
                  width: scale(50),
                  backgroundColor: '#FFFFFF',
                  height: verticalScale(90),
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={'power-off'} size={scale(22)} color={'red'} />
                <Text
                  style={{ fontSize: scale(11), paddingTop: 5, fontWeight: '500' }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                width: 63,
                position: 'absolute',
                bottom: 20,
                right: 20,
                height: 63,
                borderRadius: 100,
              }}
              onPress={navigation.toggleDrawer}
            >
              <Image
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                source={require('../../assets/Main_Menu_icon-Menu.png')}
              />
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </View>
      {type === 0 ?
        <CameraView
          takeImage={takeImage}
          onClose={closeCamera}
        />
        : null
      }
      <FullScreenLoader isFetching={userLoading} />
      <ActionSheet
        ref={o => this.ActionSheet = o}
        title={'Choose Option'}
        options={['Camera', 'Gallery', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={(index) => index === 0 ? onHandleCameraTapped() : index === 1 ? pickImage() : setType(null)}
      />
    </>
  );
};

Profile['navigationOptions'] = () => ({
  headerStyle: {
    backgroundColor: 'transparent',
  },
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
});

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  loading: state.profile.getProfileLoading,
  error: state.profile.getProfileError,
  userLoading: state.user.userLoading,
  userStatus: state.user.userStatus
})

export default connect(mapStateToProps, { getProfileAPI, logout })(Profile);