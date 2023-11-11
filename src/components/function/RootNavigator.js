import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import BottomTabs from '../../containers/BottomTabs';
import DrugInfo from '../../screens/DrugInfo';
import React from 'react';

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DrugInfo"
        component={DrugInfo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
