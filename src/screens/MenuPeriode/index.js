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
  TouchableOpacity, ActivityIndicator, ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import downloadManager from 'react-native-simple-download-manager';

const MenuPeriode = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('');
  const [isClose, setIsClose] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setRole(await AsyncStorage.getItem('role'));
      setEndDate(await AsyncStorage.getItem('end_date'));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleClickSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    const idPeriode = await AsyncStorage.getItem('idPeriode');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      setIsLoading(true);
      const res = await Axios.get('https://e-chick-backend.herokuapp.com/api/periode/export/' +
        idPeriode,
        config
      ).then(() => doDownloadFile('https://e-chick-backend.herokuapp.com/api/periode/export/' +
        idPeriode
      ));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickClose = async () => {
    const token = await AsyncStorage.getItem('token');
    const idPeriode = await AsyncStorage.getItem('idPeriode');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log('ok')
    const body = {};
    try {
      setIsLoading(true);
      const res = await Axios.put(
        'https://e-chick-backend.herokuapp.com/api/periode/close/' + idPeriode, body,
        config
      );
      setIsLoading(false);
      setIsClose('success');
    } catch (error) {
      console.log(error);
      setIsClose('error');
    }
  };

  useEffect(() => {
    isClose == 'success' && navigation.navigate('List Periode');
    isClose == 'error' && alert('Error');
  }, [isClose]);

  const doDownloadFile = async (url) => {
    if (url) {
      const token = await AsyncStorage.getItem('token');
      const header = { Authorization: `Bearer ${token}` }
      const file_name = 'Laporan Periode.xlsx'
      const config = {
        downloadTitle: 'Download ' + file_name,
        downloadDescription:
          "Description that should appear in Native Download manager",
        saveAsName: file_name,
        allowedInRoaming: true,
        allowedInMetered: true,
        showInDownloads: true,
        external: false, //when false basically means use the default Download path (version ^1.3)
      }

      ToastAndroid.show('Downloading ...', ToastAndroid.LONG)
      downloadManager
        .download(url, header, config)
        .then(response => {
          ToastAndroid.show('Download Success', ToastAndroid.SHORT)
        })
        .catch(err => {
          ToastAndroid.show('Download Failed', ToastAndroid.SHORT)
        })
    } else {
      ToastAndroid.show('File download not found', ToastAndroid.SHORT)
    }
  }

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
        {role == 1 &&
          <TouchableOpacity
            style={styles.button}
            onPress={handleClickSubmit}>
            <Text style={styles.textButton}>Export Laporan</Text>
          </TouchableOpacity>
        }
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('List Panen')}>
          <Text style={styles.textButton}>Panen</Text>
        </TouchableOpacity>
        {endDate == 'null' &&
          <TouchableOpacity
            style={styles.button}
            onPress={handleClickClose}>
            <Text style={styles.textButton}>Tutup Periode</Text>
          </TouchableOpacity>
        }
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
