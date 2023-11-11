import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

// Connction to access the pre-populated user_db.db
const db = openDatabase({name: 'drug.db', createFromLocation: 1});

const Favourites = ({navigation}) => {
  let [userData, setUserData] = useState([]);

  let searchDrug = () => {
    db.transaction(function (txn) {
      txn.executeSql('SELECT * FROM tbl_favorite', [], function (tx, results) {
        var len = results.rows.length;
        if (len > 0) {
          var data = [];
          for (let i = 0; i < len; i++) {
            data.push(results.rows.item(i));
          }
          setUserData(data);
        }
      });
    });
  };

  useEffect(() => {
    searchDrug();
    const unsubscribe = navigation.addListener('focus', () => {
      searchDrug();
    });
    return unsubscribe;
  }, [navigation]);

  const handleItemPress = item => {
    navigation.navigate('DrugInfo', {item});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {userData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleItemPress(item)}
            style={styles.item}>
            <Text style={styles.itemText}>{item.drugName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Favourites;
