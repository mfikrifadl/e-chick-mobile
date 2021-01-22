/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const MenuPeriode = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonMenu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('List Harian')}>
          <Text style={styles.textButton}>Laporan Harian</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#009387',
  },
  buttonMenu: {
    marginTop: 5,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    marginVertical: '2%',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MenuPeriode;
