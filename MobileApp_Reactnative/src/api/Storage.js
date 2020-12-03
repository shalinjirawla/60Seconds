import { AsyncStorage } from 'react-native';

const set = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
}

const get = async (key) => {
    let data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
}

const remove = async (key) => {
    await AsyncStorage.removeItem(key).then(data => {
        if (data === null)
            return true;
    }).catch(error => {
        return false;
    });
}

export default {
    set,
    get,
    remove
}