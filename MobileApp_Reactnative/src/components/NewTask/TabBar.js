import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const renderBorder1 = (index) => {
  if (index === 0) return { borderRadius: 20, backgroundColor: 'white' };
  else
    return {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      backgroundColor: 'white',
    };
};

const renderBorder2 = (index) => {
  if (index === 1 || index === 2)
    return {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: 'white',
    };
  else if (index > 1)
    return {
      backgroundColor: 'white',
    };
};

const renderBorder3 = (index) => {
  if (index === 3)
    return {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: 'white',
    };
  else if (index > 3)
    return {
      backgroundColor: 'white',
    };
};

const renderBorder4 = (index) => {
  if (index === 4)
    return {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: 'white',
    };
};

const TabBar = ({ index = 1, onTabPress }) => {
  // This is if u want to press and then proceed
  // const [index, setIndex] = useState(tabIndex);
  // const onPress = (indx) => {
  //   console.log('onPress called');
  //   onTabPress(indx);
  //   // setIndex(indx);
  // };

  // const audio = () => {
  //   console.log("You pressed it ")
  //   console.log("Audio Rehearse Screen is pressed")
  // }

  return (
    <View style={{ height: 80, width: '100%' }}>
      <View style={styles.container}>
        <TabButton
          icon="lightbulb"
          index={index}
          isSelected={index >= 0}
          onPress={() => onTabPress(0)}
          style={renderBorder1(index)}
        />
        <TabButton
          icon="pencil"
          isSelected={index >= 1}
          onPress={() => onTabPress(1)}
          style={renderBorder2(index)}
        />
        <TabButton
          icon="microphone"
          isSelected={index >= 3}
          // onPressAudio={audio}
          onPress={() => onTabPress(3)}
          style={renderBorder3(index)}
        />
        <TabButton
          icon="camcorder"
          isSelected={index >= 4}
          onPress={() => onTabPress(4)}
          style={renderBorder4(index)}
        />
      </View>

      <View
        style={{
          height: 30,
          width: '100%',
          backgroundColor: 'transparent',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={[
            styles.text,
            {
              color: index >= 1 ? 'white' : '#b1d7fa',
              fontWeight: index >= 1 ? 'bold' : 'normal',
            },
          ]}>
          SCENARIO
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: index >= 2 ? 'white' : '#b1d7fa',
              fontWeight: index >= 2 ? 'bold' : 'normal',
            },
          ]}>
          SCRIPT
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: index >= 3 ? 'white' : '#b1d7fa',
              fontWeight: index >= 3 ? 'bold' : 'normal',
            },
          ]}>
          REHEARSE
        </Text>
        <Text
          style={[
            styles.text,
            {
              color: index >= 4 ? 'white' : '#b1d7fa',
              fontWeight: index >= 4 ? 'bold' : 'normal',
            },
          ]}>
          DELIVER
        </Text>
      </View>
    </View>
  );
};

export default TabBar;

const TabButton = ({ icon, isSelected, onPress, onPressAudio, index, style }) => {
  return (
    <TouchableOpacity disabled={false} onPress={onPress} style={[styles.btnContainer, style]}>
      <Icon
        name={icon}
        color={isSelected ? '#1469af' : 'white'}
        size={25}
        style={{ marginTop: 8 }}
      />
      <View style={[styles.btnLine, { borderBottomWidth: isSelected ? 5 : 0 }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    backgroundColor: 'rgba(152, 199, 240, 0.7)',
    borderRadius: 20,
    flexDirection: 'row',
  },
  btnContainer: {
    width: '25%',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnLine: {
    height: 1,
    width: '30%',
    borderColor: '#ffb26e',
  },
  text: {
    width: '25%',
    textAlign: 'center',
    fontWeight: '600',
  },
});
