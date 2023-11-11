import CustomBottomTab from '../components/shared/BottomTabs/CustomBottomTab';
import Cart from '../screens/About';
import Favourites from '../screens/Favourites';
import Search from '../screens/Search';
import DrugInfo from '../screens/DrugInfo';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="DrugInfo" component={DrugInfo} />
    </Stack.Navigator>
  );
}

function SettingFavort() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favourites" component={Favourites} />
      <Stack.Screen name="DrugInfo" component={DrugInfo} />
    </Stack.Navigator>
  );
}
const BottomTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>
      <Tab.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          options={{tabBarLabel: 'About'}}
          name="Cart"
          component={Cart}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Search'}}
          name="SettingStack"
          component={SettingStack}
        />
        <Tab.Screen
          options={{tabBarLabel: 'Favourites'}}
          name="SettingFavort"
          component={SettingFavort}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};
export default BottomTabs;
