import React, { Component, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
  View,
  TouchableOpacity,
  Modal,
  Slider
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('screen');

const RehearseModal = ({ modalVisible, setModalVisible }) => {
  const [fontIndex, setFontIndex] = useState(1);
  const [scrollIndex, setScrollIndex] = useState(2);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View
          style={{
            height: '75%',
            width: '95%',
            backgroundColor: 'white',
            alignSelf: 'center',
            padding: 12,
            borderRadius: 10,
          }}>
          <View style={{ flexDirection: 'row', height: '10%' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.darkBlue,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Options
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AntDesign name="close" color="grey" size={18} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text>Font Size</Text>
            <FontButtons
              fontIndex={fontIndex}
              onPress={(index) => setFontIndex(index)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text>Auto Scroll</Text>
            <ScrollButtons
              scrollIndex={scrollIndex}
              onPress={(index) => setScrollIndex(index)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text>Scroll Speed</Text>
            <Slider
              style={{ width: '100%' }}
              minimumValue={10}
              maximumValue={100}
              step={3}
              thumbTintColor={Colors.darkBlue}
              minimumTrackTintColor={Colors.darkBlue}
              maximumTrackTintColor={Colors.darkBlue}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: '3%',
                paddingRight: '3%',
              }}>
              <Text style={{ color: Colors.darkBlue }}>10</Text>
              <Text style={{ color: Colors.darkBlue }}>100</Text>
            </View>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                height: 40,
                width: 150,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: Colors.darkBlue,
                borderWidth: 1,
              }}>
              <Text style={{ color: Colors.darkBlue }}>Save & Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View >
  );
};

export default RehearseModal;

const FontButtons = ({ onPress, fontIndex }) => (
  <View
    style={{
      height: 50,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: Colors.darkBlue,
      flexDirection: 'row',
    }}>
    <TouchableOpacity
      onPress={() => onPress(1)}
      style={{
        flex: 1,
        borderColor: Colors.darkBlue,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: fontIndex === 1 ? Colors.darkBlue : 'white',
      }}>
      <Text
        style={{
          color: fontIndex === 1 ? 'white' : Colors.darkBlue,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Small
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(2)}
      style={{
        flex: 1,
        backgroundColor: fontIndex === 2 ? Colors.darkBlue : 'white',
        borderColor: Colors.darkBlue,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: fontIndex === 2 ? 'white' : Colors.darkBlue,
          fontSize: 22,
          fontWeight: 'bold',
        }}>
        Medium
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(3)}
      style={{
        flex: 1,
        backgroundColor: fontIndex === 3 ? Colors.darkBlue : 'white',
        borderColor: Colors.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: fontIndex === 3 ? 'white' : Colors.darkBlue,
          fontSize: 26,
          fontWeight: 'bold',
        }}>
        Large
      </Text>
    </TouchableOpacity>
  </View>
);
const ScrollButtons = ({ onPress, scrollIndex }) => (
  <View
    style={{
      height: 50,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: Colors.darkBlue,
      flexDirection: 'row',
    }}>
    <TouchableOpacity
      onPress={() => onPress(1)}
      style={{
        flex: 1,
        borderColor: Colors.darkBlue,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: scrollIndex === 1 ? Colors.darkBlue : 'white',
      }}>
      <Text
        style={{
          color: scrollIndex === 1 ? 'white' : Colors.darkBlue,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        Off
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => onPress(3)}
      style={{
        flex: 1,
        backgroundColor: scrollIndex === 2 ? Colors.darkBlue : 'white',
        borderColor: Colors.darkBlue,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: scrollIndex === 2 ? 'white' : Colors.darkBlue,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        On
      </Text>
    </TouchableOpacity>
  </View>
);
