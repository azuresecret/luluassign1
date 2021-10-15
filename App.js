import React, { useMemo, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Map as ImmutableMap, fromJS } from 'immutable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppMainTabView } from './components/Home';
import UserContext from './contexts/User';
import storeUser from './resources/storeUserInLocalStorage';

export default function App() {
  const [user, mutateUser] = useState(ImmutableMap());
  const value = useMemo(
    () => ({ user, mutateUser }),
    [user],
  );
  // when app first launches, we first either retrieve data storage, if nothing in storage, set everytrhing to new.
  const getUser = async () => {
    try {
      const userVal = await AsyncStorage.getItem('@user');
      if (userVal !== null) {
        // value previously stored, retrieve old username3
        mutateUser(fromJS(JSON.parse(userVal)));
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    console.log('user will be stored in parent', user);
    if (user.size !== 0) storeUser(user);
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={value}>
      <NavigationContainer>
        <AppMainTabView />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
