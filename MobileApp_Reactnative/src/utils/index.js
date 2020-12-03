import {
  AsyncStorage
} from 'react-native';
import moment from 'moment'

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('Async', e);
  }
};

export const clearItems = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('Async Clear', e);
  }
};

export const wordCount = (str) => {
  var matches = str.match(/[\w\d\’\'-]+/gi);
  return matches ? matches.length : 0;
};


export function updateLocale() {
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '%ds',
      ss: '%ss',
      m: '%dm',
      mm: '%dm',
      h: '%dh',
      hh: '%dh',
      d: '%dd',
      dd: '%dd',
      M: '%dM',
      MM: '%dM',
      y: '%dY',
      yy: '%dY',
    },
  });
}
