import {StyleSheet, View} from 'react-native';
import React from 'react';
import SearchInput from '../components/function/SearchInput';

const Search = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SearchInput navigation={navigation} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
