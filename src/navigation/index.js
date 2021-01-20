import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Login, Home, Splash, ListPeriode, Akun} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ListPeriode" component={ListPeriode} />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'MainApp'} component={MainApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
