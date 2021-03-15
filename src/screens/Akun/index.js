/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';

const Akun = (props) => {
  const handleLogOut = async () => {
    await AsyncStorage.setItem('token', '');
    props.navigation.navigate('Login');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Akun</Text>
        <Button title="logout" onPress={handleLogOut} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default Akun;
