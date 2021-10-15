import {
  FlatList, Image, TouchableOpacity, View, Text,
} from 'react-native';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { fromJS } from 'immutable';
import globalStyle from '../styles/globalStyle';
import MenuData from '../resources/loadMenuImage';
import UserContext from '../contexts/User';

function MenuItem({ item, onPress }) {
  const [orderedPieces, setOrderedPieces] = useState(0);
  return (
    <TouchableOpacity onPress={() => onPress({ orderedPieces, setOrderedPieces })} style={globalStyle.item}>
      <Image
        source={item.imgLink}
        style={globalStyle.menuLogo}
      />
      <Text>{orderedPieces}</Text>
    </TouchableOpacity>
  );
}

function MenuScreen() {
  const { user, mutateUser } = useContext(UserContext);
  const [submitting, setSubmitting] = useState(false);
  const [orderedItemList, setOrderedItemList] = useState([]);

  useEffect(() => {
    if (submitting && orderedItemList.length !== 0) {
      const mergedList = user.get('orderedItem') ? [...user.get('orderedItem').toJS(), ...orderedItemList] : [...orderedItemList];
      mutateUser(user.set('orderedItem', fromJS(mergedList)));
      setSubmitting(false);
      setOrderedItemList([]);
    }
  }, [submitting]);

  const updateUserOrderedItem = useCallback(({ orderedPieces, setOrderedPieces, item }) => {
    const updatedOrderPieces = orderedPieces + 1;
    const backUpOrderList = [...orderedItemList];
    console.log('this is backupss', backUpOrderList);
    backUpOrderList.push(item);
    setOrderedItemList(backUpOrderList);
    setOrderedPieces(updatedOrderPieces);
  }, [orderedItemList]);

  const renderMenuItem = ({ item, orderedList }) => (
    <MenuItem
      item={item}
      onPress={({ orderedPieces, setOrderedPieces }) => updateUserOrderedItem({ orderedPieces, setOrderedPieces, item })}
      orderedItemList={orderedList}
    />
  );
  //  console.log('this is user after updated', user);

  const submitButtonClicked = () => {
    setSubmitting(true);
  };
  return (
    <View style={globalStyle.menuContainer}>
      <FlatList
        data={MenuData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        extraData={orderedItemList}
        renderItem={({ item }) => renderMenuItem({ item, orderedItemList })}
      />
      <TouchableOpacity
        onPress={submitButtonClicked}
        style={globalStyle.roundButton1}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MenuScreen;
