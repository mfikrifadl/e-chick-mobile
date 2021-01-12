import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DetailScreen from './DetailScreen';
import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Feed" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Detail"
      component={DetailStackScreen}
      options={{
        tabBarLabel: 'Detail',
        tabBarIcon: ({color}) => (
          <Icon name="notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => <Icon name="person" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="logo-react" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Overview',
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={25}
            backgroundColor="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);
const DetailStackScreen = ({navigation}) => (
  <DetailStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <DetailStack.Screen name="Details" component={DetailScreen} />
  </DetailStack.Navigator>
);
