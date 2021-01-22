import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Login,
  Home,
  Splash,
  ListPeriode,
  Akun,
  FormPeriode,
  MenuPeriode,
  ListHarian,
  FormHarian,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="List Periode" component={ListPeriode} />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Splash'}
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          name={'Login'}
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name={'MainApp'}
          component={MainApp}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Form Periode'} component={FormPeriode} />
        <Stack.Screen name={'Menu Periode'} component={MenuPeriode} />
        <Stack.Screen name={'List Harian'} component={ListHarian} />
        <Stack.Screen name={'Form Harian'} component={FormHarian} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
