import {
  FlatList, TouchableOpacity, View, Text,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { fromJS } from 'immutable';
import globalStyle from '../styles/globalStyle';
import UserContext from '../contexts/User';

function CartItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={globalStyle.item}>
      <Text style={globalStyle.title}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const cartEmptyString = 'Your cart is empty, please go to the menu screen to order some items. ';

function CartScreen() {
  const { user, mutateUser } = useContext(UserContext);

  const [orderedItemList, setOrderedItemList] = useState([]);

  useEffect(() => {
    console.log('inside cart effect')
    if (user.get('orderedItem')) {
      setOrderedItemList(user.get('orderedItem').toJS());
    }
  }, [user]);


  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onPress={() => {
        console.log('pressed', item);
       const filtered = orderedItemList.filter((arrItem) => arrItem.id !== item.id)
        setOrderedItemList(filtered);
        mutateUser(user.set('orderedItem', fromJS(filtered)));
      }}
    />
  );

  return (
    <View style={globalStyle.menuContainer}>
      {orderedItemList.length ? null : <Text>{cartEmptyString}</Text>}
      <FlatList
        data={orderedItemList}
        extraData={user}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={renderCartItem}
      />
    </View>
  );
}

export default CartScreen;
