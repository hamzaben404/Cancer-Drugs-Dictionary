import {View} from 'react-native';
import React from 'react';
import FavoriteScreen from '../components/function/FavoriteScreen';

const Favourites = ({navigation}) => {
  return (
    <View>
      <FavoriteScreen navigation={navigation} />
    </View>
  );
};

export default Favourites;
