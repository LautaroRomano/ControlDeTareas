import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveJSON = async (value,key) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e)
    }
}

export const saveString = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
        console.log(e)
    }
}

export const getString = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        return value;
      }
    } catch(e) {
      console.log(e)
      return null;
    }
}

export const getJSON = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e)
    }
  }