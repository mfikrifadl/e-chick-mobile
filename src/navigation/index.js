import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  ListPanen,
  FormPanen,
  FormEditPanen,
  FormTambahPegawai,
  Overview
} from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = (props) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setRole(await AsyncStorage.getItem('role'));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  return (
    <Tab.Navigator>
      {role == 1 &&
        <Tab.Screen name="Home" component={Home}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" size={wp('5%')} />
            ),
          }} />
      }
      <Tab.Screen name="List Periode" component={ListPeriode}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="content-paste" size={wp('5%')} />
          ),
        }} />
      <Tab.Screen name="Akun" component={Akun}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={wp('5%')} />
          ),
        }} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Splash'}
          options={{ headerShown: false }}
          component={Splash}
        />
        <Stack.Screen
          name={'Login'}
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name={'MainApp'}
          component={MainApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'Form Periode'} component={FormPeriode} />
        <Stack.Screen name={'Menu Periode'} component={MenuPeriode} />
        <Stack.Screen name={'List Harian'} component={ListHarian} />
        <Stack.Screen name={'Form Harian'} component={FormHarian} />
        <Stack.Screen name={'Form Panen'} component={FormPanen} />
        <Stack.Screen name={'Form Edit Panen'} component={FormEditPanen} />
        <Stack.Screen name={'List Panen'} component={ListPanen} />
        <Stack.Screen name={'Form Tambah Pegawai'} component={FormTambahPegawai} />
        <Stack.Screen name={'Overview'} component={Overview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
