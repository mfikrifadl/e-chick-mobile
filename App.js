/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import {DrawerContent} from './screens/DrawContent';
import BookmarkScreen from './screens/BookmarkScreen';
import SettingScreen from './screens/SettingScreen';
import RootStackScreen from './screens/RootStackScreen';
import {View} from 'react-native-animatable';
import {ActivityIndicator} from 'react-native';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [usertoken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken('fgkj');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <RootStackScreen />
      {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="Support" component={SupportScreen} />
        <Drawer.Screen name="Bookmark" component={BookmarkScreen} />
        <Drawer.Screen name="Setting" component={SettingScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
