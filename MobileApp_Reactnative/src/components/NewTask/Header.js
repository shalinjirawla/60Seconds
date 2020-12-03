import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { IMAGES_MOCKS } from '../../constants/mocks';
import TabBar from './TabBar';
import { verticalScale } from 'react-native-size-matters';

const window = Dimensions.get('window');
const ratio = window.width / 421;

const Header = ({ currentTab, savePressed, cancelPressed, navigation, setActiveIndex }) => {
  return (
    <View style={{ height: 200 * ratio, zIndex: 100 }}>
      <ImageBackground
        source={IMAGES_MOCKS.header}
        resizeMode="stretch"
        style={{
          flex: 1,
          height: 200 * ratio,
          width: '100%',
          marginTop: -verticalScale(3),
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <View
          style={{
            paddingLeft: 8,
            paddingRight: 8,
          }}>
          <View style={{
            height: 85,
            flexDirection: 'row',
            width: '100%',
            paddingLeft: 8,
            paddingRight: 8,
            alignItems: 'center'
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', { refetch: true })} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ width: 20 * ratio, height: 20 * ratio, resizeMode: 'contain', }}
                source={require('../../../assets/icon-back.png')}
              />
              <Text style={{ color: '#fff', fontSize: 20 * ratio, marginLeft: 10 }}>{'Back to Tasks'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 100, width: '100%', justifyContent: 'center' }}>
            <TabBar
              index={currentTab}
              onTabPress={(index) => setActiveIndex(index)}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: 'white',
  },
});
