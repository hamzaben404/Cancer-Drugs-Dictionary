import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTabs from './src/containers/BottomTabs';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
// import RootNavigator from './src/components/function/RootNavigator';
const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer onReady={() => changeNavigationBarColor('white')}>
        <BottomTabs />
        {/* <RootNavigator /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
