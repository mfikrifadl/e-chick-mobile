/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props) => {
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    props.navigation.navigate(token ? 'Home' : 'Login');
  };
  useEffect(() => {
    setTimeout(() => {
      checkToken();
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Splash</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
});

export default Splash;
