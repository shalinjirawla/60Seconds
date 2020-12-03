import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IMAGES_MOCKS } from '../constants/mocks';
import { Colors } from '../constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Context as TaskContext } from '../context/taskContext';

const TaskList = ({ navigation }) => {
  const { state, addScenario } = useContext(TaskContext);

  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('');
  const [situation, setSituation] = useState('');
  const [keywords, setKeywords] = useState('');

  const saveData = (btnName) => {
    // Store Data
    console.log("tasklist screen")

    // Move to next screen
    if (btnName === 'save&next') {
      console.log({ title, audience, situation, keywords });
      // Store Data
  
      // Move to next screen
      if (btnName === 'save&next') {
        // Posting Scenario Data to server while all the fields are filled
        if(title !== '' && audience !== '' && situation !== '' && keywords !== '') {
          addScenario ({ title, audience, situation, keywords, navigation })
          console.log("Scenario id = ",state.scenarioId)
        } else {
          console.log("Please enter all the fields")
        }
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#e1eefe' }}>
      <ScrollView>
        <View style={{ height: 220 }}>
          <ImageBackground
            source={IMAGES_MOCKS.header}
            resizeMode="contain"
            style={{
              flex: 1,
              height: 230,
              width: '100%',
              marginTop: -15,
              paddingTop: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 16,
              }}>
              <Image
                source={IMAGES_MOCKS.logo}
                style={{ height: moderateScale(50), width: moderateScale(120) }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{
                  marginRight: '4.5%',
                  width: moderateScale(28),
                  backgroundColor: '#FFFFFF',
                  height: moderateScale(48),
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fd6f2a',
                    fontSize: moderateScale(14),
                    fontWeight: 'bold',
                  }}>
                  2
                </Text>
                <Icon name={'bell'} size={scale(16)} color={'#fe9f63'} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 16,
                paddingRight: 16,
              }}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                Task List (4)
              </Text>
              <TouchableOpacity
                style={{
                  width: moderateScale(60),
                  backgroundColor: '#FFFFFF',
                  height: moderateScale(60),
                  borderRadius: moderateScale(60) / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={'plus'}
                  size={moderateScale(38)}
                  color={'#243f68'}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View style={{ paddingRight: 16, paddingLeft: 16 }}>
          <View style={{ height: 80, marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: Colors.textColor }}>
              Task Title
            </Text>
            <TextInput
              onChangeText={(value) => setTitle(value)}
              value={title}
              style={{ height: 45, backgroundColor: 'white', borderRadius: 5 }}
            />
          </View>
          <View style={{ height: 80, marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: Colors.textColor }}>
              Audience
            </Text>
            <TextInput
              onChangeText={(value) => setAudience(value)}
              value={audience}
              style={{ height: 45, backgroundColor: 'white', borderRadius: 5 }}
            />
          </View>
          <View style={{ height: 80, marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: Colors.textColor }}>
              Situation
            </Text>
            <TextInput
              onChangeText={(value) => setSituation(value)}
              value={situation}
              style={{ height: 45, backgroundColor: 'white', borderRadius: 5 }}
            />
          </View>
          <View style={{ height: 80, marginTop: 20 }}>
            <Text style={{ fontSize: 18, color: Colors.textColor }}>
              Keywords
            </Text>
            <TextInput
              onChangeText={(value) => setKeywords(value)}
              value={keywords}
              style={{ height: 45, backgroundColor: 'white', borderRadius: 5 }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              saveData('save&next');
            }}
            style={{
              height: 45,
              backgroundColor: '#3e98e0',
              borderRadius: 5,
              marginTop: 20,
              marginBottom: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>
              Save {'&'} Next
            </Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'flex-end',
              height: verticalScale(80),
              paddingBottom: 20,
            }}>
            <TouchableOpacity
              onPress={() => { }}
              style={{
                width: scale(50),
                height: scale(50),
                borderRadius: scale(50) / 2,
                backgroundColor: '#0b5fa1',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 15,
              }}>
              <Entypo name={'menu'} size={35} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

TaskList['navigationOptions'] = (screenProps) => ({
  headerShown: false,
});

export default TaskList;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    color: 'white',
  },
});
