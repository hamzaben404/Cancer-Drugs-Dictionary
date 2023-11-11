import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {openDatabase} from 'react-native-sqlite-storage';

const Profile = () => {
  const route = useRoute();
  const item = route.params?.item;
  const [isLiked, setIsLiked] = useState(false);
  const [favoriteDrugs, setFavoriteDrugs] = useState([]);

  const db = openDatabase({name: 'drug.db', createFromLocation: 1});

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tbl_favorite WHERE drugName = ?',
        [item?.drugName],
        (_, {rows}) => {
          if (rows.length > 0) {
            setIsLiked(true);
          }
        },
      );
    });
  }, [db, item?.drugName]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await db.transaction(tx => {
          tx.executeSql(
            'DELETE FROM tbl_favorite WHERE drugName = ?',
            [item?.drugName],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                // Alert.alert('success');
              } else {
                alert('failed');
              }
            },
          );
        });
      } else {
        await db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO tbl_favorite (drugName, tradeName, Indications, drugClassAndOrMechanism, drugInteractions, Toxicity, dosageAndAdministration) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
              item?.drugName,
              item?.tradeName,
              item?.Indications,
              item?.drugClassAndOrMechanism,
              item?.drugInteractions,
              item?.Toxicity,
              item?.dosageAndAdministration,
            ],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                // Alert.alert('success');
              } else {
                alert('failed');
              }
            },
          );
        });
      }

      setIsLiked(!isLiked); // Update the state only if the database transaction is successful
    } catch (error) {
      console.log(error);
    }
  };

  const formatTextWithLineBreaks = text => {
    return text.replace(/•/g, '\n').replace(/\*/g, '\n-');
  };

  if (!item) {
    return null; // Render nothing if the item is empty
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/backgroundImage.jpg')}
        style={styles.backgroundImage}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.likeContainer}>
            <MaterialCommunityIcons
              name={isLiked ? 'cards-heart' : 'cards-heart-outline'}
              size={40}
              color={isLiked ? '#be302f' : 'black'}
              onPress={handleLike}
            />
          </View>
          {item.drugName ? (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Drug Name:</Text>
              <View style={styles.box}>
                <Text style={styles.text}>{item.drugName}</Text>
              </View>
            </View>
          ) : null}
          {item.tradeName ? (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Trade Name:</Text>

              <View style={styles.box}>
                <Text style={styles.text}>{item.tradeName}</Text>
              </View>
            </View>
          ) : null}
          {item.Indications ? (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Indications:</Text>
              <View style={styles.box}>
                <Text style={styles.text}>
                  {formatTextWithLineBreaks(item.Indications)}
                </Text>
              </View>
            </View>
          ) : null}
          {item.drugClassAndOrMechanism ? (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Drug Class And Or Mechanism:</Text>
              <View style={styles.box}>
                <Text style={styles.text}>
                  {formatTextWithLineBreaks(item.drugClassAndOrMechanism)}
                </Text>
              </View>
            </View>
          ) : null}
          {item.drugInteractions ? (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Drug Interactions:</Text>
              <View style={styles.box}>
                <Text style={styles.text}>
                  {formatTextWithLineBreaks(item.drugInteractions)}
                </Text>
              </View>
            </View>
          ) : null}
          {item.Toxicity ? (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Toxicity:</Text>
              <View style={styles.box}>
                <Text style={styles.text}>
                  {formatTextWithLineBreaks(item.Toxicity)}
                </Text>
              </View>
            </View>
          ) : null}
          {item.dosageAndAdministration ? (
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Dosage and Administration:</Text>
              <View style={styles.box}>
                <Text style={styles.text}>
                  {formatTextWithLineBreaks(item.dosageAndAdministration)}
                </Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
    marginBottom: 39,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  infoContainer: {
    marginBottom: 20,
    paddingBottom: 70,
  },
  likeContainer: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white',
  },
  box: {
    backgroundColor: '#be302f',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default Profile;
