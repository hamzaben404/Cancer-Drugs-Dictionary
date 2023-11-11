import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Linking,
  ImageBackground,
  ScrollView,
} from 'react-native';

const AboutScreen = () => {
  const handleLinkPress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error opening URL:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/backgroundImage.jpg')}
      style={styles.backgroundImage}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>ABOUT</Text>
          <SafeAreaView style={styles.contentContainer}>
            <Text style={styles.text}>
              This smartphone application is an interactive dictionary of drugs
              (authorized by the FDA) used for cancer treatments.{'\n'}
              This application is an attempt to facilitate and give the
              oncologist the most accurate information regarding these drugs.
              {'\n\n'}
              This dictionary provides information regarding trade Name, drug
              class or mechanism, drug interaction, toxicity, indications,
              dosage, and administration for each drug.{'\n\n'}
              The database is not pretending to be exhaustive, and therefore,
              we're open to any addition and enrichment.{'\n\n'}
              In case you have any suggestions, please contact Prof. N.
              Boukhatem.
              {'\n'}
              Professor Nour Eddine Boukhatem is in charge of scientific
              contents at Mohammed First University, Oujda, Morocco.{'\n'}
              <Text
                style={styles.linkText}
                onPress={() =>
                  handleLinkPress(
                    'https://www.linkedin.com/in/prof-noureddine-boukhatem/n.boukhatem@ump.ac.ma',
                  )
                }>
                https://www.linkedin.com/in/prof-noureddine-boukhatem/n.boukhatem@ump.ac.ma
              </Text>
              {'\n'}
              {'\n'}
              Developers: {'\n'}
              Merzouki Kaouthar{'\n'}
              Benatmane Hamza
            </Text>
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    marginBottom: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: 'black',
  },
  contentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  text: {
    fontSize: 17,
    color: 'white',
    paddingBottom: -20,
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
