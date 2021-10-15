import React, { useEffect, useState, useContext } from 'react';
import {
  TouchableOpacity, View, Text, TextInput,
} from 'react-native';
import { Map as ImmutableMap } from 'immutable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyle from '../styles/globalStyle';
import MenuScreen from './Menu';
import CartScreen from './Cart';
import UserContext from '../contexts/User';

function HomeScreen({ navigation }) {
  const { user, mutateUser } = useContext(UserContext);
  const [userNameInput, userNameInputOnChange] = React.useState('');
  const [submitting, setSubmitting] = useState(false);
  const WelcomeString = 'Welcome, please type in your name to use the app';

  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(value.toJSON()));
    } catch (e) {
      // saving error
    }
  };
  const submitButtonClicked = () => {
    setSubmitting(true);
    mutateUser(user.set('name', userNameInput));
  };

  useEffect(() => {
    if (submitting) storeUser(user);
  }, [submitting]);

  return (
    <View style={globalStyle.homeStyles}>
      <View style={globalStyle.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={globalStyle.buttonStyle}>
          <Text style={globalStyle.appButtonText}>Go To Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={globalStyle.buttonStyle}>
          <Text style={globalStyle.appButtonText}>Go To Cart</Text>
        </TouchableOpacity>
      </View>
      <Text>{user.get('name') ? `Hello Dear ${user.get('name')}` : WelcomeString}</Text>

      <TextInput
        onChangeText={userNameInputOnChange}
        placeholder="Please Enter your name to start using the app"
        style={globalStyle.input}
        value={userNameInput}
      />
      <TouchableOpacity onPress={submitButtonClicked} style={globalStyle.nameButton}>
        <Text style={globalStyle.appButtonText}>SubmitName</Text>
      </TouchableOpacity>
    </View>
  );
}

const Tab = createBottomTabNavigator();
export function AppMainTabView() {
  const [data, setGlobalData] = useState(new ImmutableMap({
    orderedItemList: [],
  }));
  return (
    <Tab.Navigator>
      <Tab.Screen children={({ navigation }) => <HomeScreen data={data} navigation={navigation} setGlobalData={setGlobalData} />} name="Home" />
      <Tab.Screen children={() => <MenuScreen data={data} setGlobalData={setGlobalData} />} name="Menu" />
      <Tab.Screen children={() => <CartScreen data={data} setGlobalData={setGlobalData} />} name="Cart" />
    </Tab.Navigator>
  );
}

export default HomeScreen;
