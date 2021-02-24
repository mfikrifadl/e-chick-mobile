/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const MenuPeriode = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    const idPeriode = await AsyncStorage.getItem('idPeriode');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      setIsLoading(true);
      const res = await Axios.get(
        'https://e-chick-backend.herokuapp.com/api/periode/export/' +
        idPeriode,
        config,
      );
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading === true) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#009387" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonMenu}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleClickSubmit}>
          <Text style={styles.textButton}>Export Laporan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('List Harian')}>
          <Text style={styles.textButton}>Laporan Harian</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Form Periode')}>
          <Text style={styles.textButton}>Edit Periode</Text>
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
    // fontWeight: 'bold',
  },
});

export default MenuPeriode;
