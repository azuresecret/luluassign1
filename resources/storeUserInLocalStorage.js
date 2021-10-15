import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUser = async (value) => {
  try {
    await AsyncStorage.setItem('@user', JSON.stringify(value.toJSON()));
  } catch (e) {
    // saving error
  }
};

export default storeUser;
