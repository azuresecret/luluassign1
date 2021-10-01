import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Button,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity, TouchableOpacityComponent,
    View,
} from 'react-native';
import { Touchable } from 'react-native-web';
import { Map as ImmutableMap } from 'immutable';
import appetizer from './assets/appetizer.jpeg';
import drink from './assets/drink.jpeg';
import mainDish from './assets/maindish.jpeg';
import mainDish2 from './assets/mainDish2.jpeg';
import sideDish from './assets/sidedish.jpeg';
import sideDish2 from './assets/sideDish2.jpeg';
import wine from './assets/wine.jpeg';
import appetizer2 from './assets/appetizer2.jpeg';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  input:{
   width:150,
   height:50,
  },

  buttonStyle: {
    flex: 1,
    padding: 20,
  },
  container: {
    display: 'flex',
    marginHorizontal: 20,
    marginTop: 10,
  },
  homeStyles: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 5,
    // marginVertical: 8,
    // marginHorizontal: 16,
    flex: 1,

  },
  menuContainer: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  menuLogo: {
    height: win.width / 2,
    maxHeight: '300px',
    maxWidth: '300px',
    width: win.width / 2,
  },
  tabViewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
});

const DATA = [
  {
    id: 'main_dish1',
    imgLink: mainDish,
    title: 'GuoBao Pork',
  },
  {
    id: 'main_dish2',
    imgLink: mainDish2,
    title: 'Moo Shoo Pork',
  },
  {
    id: 'side_dish1',
    imgLink: sideDish,
    title: 'Chicken Wing',
  },
  {
    id: 'side_dish2',
    imgLink: sideDish2,
    title: 'Mozzarella stick',
  },
  {
    id: 'drink_img',
    imgLink: drink,
    title: 'Beer',
  },
  {
    id: 'drink_img2',
    imgLink: wine,
    title: 'Wine',
  },
  {
    id: 'appetizer',
    imgLink: appetizer,
    title: 'Appetizer',
  },
  {
    id: 'appetizer2',
    imgLink: appetizer2,
    title: 'Appetizer2',
  },
];

function HomeScreen({ navigation }) {
    const [username, setName] =useState('');

    return (
        <View style = {[styles.container,{
            flexDirection:"column"
        }]}>
            <Text>Enter Your Name: </Text>
            <TextInput
                style={styles.input}
                placeholder= 'e.g. John Doe'
                onChangeText={(username) =>setName(username)}/>
            <View style={{width: 100, height: 100, marginTop: 10}}>
                <Button
                    title="Confirm"
                    color="#2E8B57"
                    onPress={() => navigation.navigate('Menu',{paramKey:username,})}
                />
            </View>
            <View style = {[styles.container,{
                flexDirection:"row"
            }]}>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Button onPress={() => navigation.navigate('Menu')} title="Go To Menu" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}>
                    <Button onPress={() => navigation.navigate('Cart')} title="Go To Cart" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function CartItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
}

function CartScreen({ data, setGlobalData }) {
  const [cartList, changeCartList] = useState(data.get('orderedItemList'));

  // a helper variable because passing cartList to extraData will not cause it to rerender.
  const [cartEmptyString, setCartEmptyString] = useState('No items ordered');

  useEffect(() => {
    console.log('data.', data.get('orderedItemList'));
    changeCartList(data.get('orderedItemList'));
    if (cartList.length) setCartEmptyString(' ');
  }, [data]);

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onPress={() => {
        console.log('pressed');
        setGlobalData((da) => {
          const listBackUp = [...cartList];
          listBackUp.splice(cartList.indexOf(item), 1);
          return da.set('orderedItemList', listBackUp);
        });
        // const newList = [...data.orderedItem];
        //
        // const newDat = { ...data };
        // newDat.orderedItem = newList;
        // return setGlobalData(newDat);
      }}
    />
  );

  return (
    <View style={styles.menuContainer}>
      <Text>{cartEmptyString}</Text>
      <FlatList
        data={cartList}
        extraData={cartEmptyString}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={renderCartItem}
      />
    </View>
  );
}

function MenuItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      {/* <Text style={styles.title}>{item.title}</Text> */}
      <Image
        source={item.imgLink}
        style={styles.menuLogo}
      />
    </TouchableOpacity>
  );
}

function MenuScreen({ data, setGlobalData }) {
  const renderMenuItem = useCallback(({ item }) => (
    <MenuItem
      item={item}
      onPress={() => {
        // const oldArr = data.get('orderedItemList');
        // oldArr.push(item);
        setGlobalData(da => {
          const copy = [...da.get('orderedItemList')];
          copy.push(item);
          return da.set('orderedItemList', copy);
        });
        // const newDat = { ...data };
        // console.log(item, 'and tata', newDat);
        // newDat.orderedItem.push(item);
        // setGlobalData(newDat);
      }}

    />
  ), []);
  return (
    <View style={styles.menuContainer}>
      <FlatList
        data={DATA}
        // extraData={menuString}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderMenuItem}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
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

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
