/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'drug.db', createFromLocation: 1});

const SearchInput = ({navigation}) => {
  const [inputDrugName, setInputDrugName] = useState('');
  const [userData, setUserData] = useState([]);

  const searchDrug = () => {
    console.log(inputDrugName);
    setUserData([]);
    db.transaction(function (txn) {
      txn.executeSql(
        'SELECT * FROM tbl_drug WHERE drugName LIKE ? OR Keywords LIKE ?',
        [`%${inputDrugName}%`, `%${inputDrugName}%`],
        function (tx, results) {
          const len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            const data = [];
            for (let i = 0; i < len; i++) {
              data.push(results.rows.item(i));
            }
            setUserData(data);
          }
        },
      );
    });
  };

  useEffect(() => {
    searchDrug();
  }, [inputDrugName]);

  return (
    // <View style={styles.container}>
    <ImageBackground
      source={require('../../assets/backgroundImage.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.searchIcon}>
        <Icon name={'search'} size={20} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Search'}
          placeholderTextColor={'black'}
          placehold
          onChangeText={inputDrugName => setInputDrugName(inputDrugName)}
          underlineColorAndroid="transparent" // Add this line
          backgroundColor="transparent" // Add this line
        />
      </View>
      {inputDrugName.length > 0 && (
        <ScrollView style={styles.scrollViewBackground}>
          {userData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('DrugInfo', {item});
              }}
              style={styles.drugItem}>
              <Text style={styles.drugName}>{item.drugName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </ImageBackground>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200, // Adjust the marginTop value as needed
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 0,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 10,
    padBottom: 200,
  },
  searchIcon: {
    position: 'absolute',
    left: 70,
    top: 212,
  },
  scrollViewBackground: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.49)', // Add background color
    padding: 10, // Add padding
    marginHorizontal: 20, // Add horizontal margin
    marginBottom: 130, // Add bottom margin
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginLeft: 60,
    marginRight: 60,
  },
  drugItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drugName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
});

export default SearchInput;
