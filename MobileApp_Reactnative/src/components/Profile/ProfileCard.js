import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';

const ProfileCard = ({
  cardColor = '#00b3bb',
  number = 5,
  title = 'Task Completed',
}) => {
  return (
    <View
      style={{
        width: scale(100),
        height: verticalScale(150),
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          height: verticalScale(50),
          width: scale(100),
          backgroundColor: cardColor,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            textAlign: 'center',
            fontWeight: '500',
          }}>
          {number}
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.background}>
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: cardColor,
            }}></View>
        </View>
      </View>
      <View
        style={{
          height: verticalScale(60),
          width: scale(100),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            padding: 12,
            fontSize: 16,
            textAlign: 'center',
            color: '#38598a',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: scale(100),
    overflow: 'hidden', // for hide the not important parts from circle
    height: 30,
  },
  background: {
    // this shape is a circle
    borderBottomEndRadius: 300, // border borderRadius same as width and height
    width: 400,
    height: 400,
    marginLeft: -80, // reposition the circle inside parent view
    position: 'absolute',
    bottom: 0, // show the bottom part of circle
    overflow: 'hidden', // hide not important part of image
  },
});
