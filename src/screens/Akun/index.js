/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, TouchableOpacity, Image } from 'react-native';

const Akun = (props) => {
  const [role, setRole] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setRole(await AsyncStorage.getItem('role'));
      setNama(await AsyncStorage.getItem('nama_user'));
      setEmail(await AsyncStorage.getItem('email'));
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const handleLogOut = async () => {
    await AsyncStorage.setItem('token', '');
    props.navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardHeader}>
        <Image
          style={styles.image}
          source={require('../../assets/avatar.png')} />
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{nama}</Text>
        <Text>{email}</Text>
        {role == 1 && <Text>Pemilik</Text>}
        {role == 2 && <Text>Anak Kandang</Text>}
      </View>
      { role == 1 && <TouchableOpacity style={styles.btnPegawai} onPress={() => props.navigation.navigate('Form Tambah Pegawai')}><Text style={{ color: 'white' }}>Tambah Anak Kandang</Text></TouchableOpacity>}
      <View style={styles.buttonButtom}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleLogOut}>
          <Text style={{ color: 'white' }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    width: wp('20%'),
    height: wp('20%')
  },
  cardHeader: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 10,
    width: wp('90%'),
    height: hp('30%'),
    paddingTop: 40,
    alignItems: 'center'
  },
  scrollView: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  buttonButtom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: '#009387',
    position: 'absolute',
    bottom: -20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    width: wp('90%')
  },
  btnPegawai: {
    backgroundColor: '#009387',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('90%')
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Akun;
