/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, StyleSheet, View, Text, Button, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';

const Home = (props) => {
  const [sisa_ayam, setSisaAyam] = useState('');
  const [afkir, setAfkir] = useState('');
  const [mati, setMati] = useState('');
  const [pakan_masuk, setPakanMasuk] = useState('');
  const [pakan_keluar, setPakanKeluar] = useState('');
  const [sisa_pakan, setSisaPakan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      setIsLoading(true);
      getData();
      setIsLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await Axios.get(
        'https://e-chick-backend.herokuapp.com/api/home',
        config,
      );
      setSisaAyam(res.data.data.sisa_ayam);
      setMati(res.data.data.mati);
      setAfkir(res.data.data.afkir);
      setPakanKeluar(res.data.data.pakan_keluar);
      setPakanMasuk(res.data.data.pakan_masuk);
      setSisaPakan(res.data.data.sisa_pakan);
    } catch (error) {
      console.log(error);
      alert('gagal');
      setIsLoading(false);
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
    <SafeAreaView>
      <View style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.header}>
          <View style={styles.rowHeader}>
            <TouchableOpacity style={[styles.buttonHeader, { backgroundColor: '#fd6768' }]} onPress={() => props.navigation.navigate('List Periode')}>
              <Text style={styles.textHeader}>Periode</Text>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="typewriter" style={{ color: '#fd6768' }} size={wp('8%')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonHeader, { backgroundColor: '#109da4' }]} onPress={() => props.navigation.navigate('Overview')}>
              <Text style={styles.textHeader}>Overview (Grafik)</Text>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="chart-bar" style={{ color: '#109da4' }} size={wp('8%')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowHeader}>
            <TouchableOpacity style={[styles.buttonHeader, { backgroundColor: '#f0981a' }]} onPress={() => props.navigation.navigate('Akun')}>
              <Text style={styles.textHeader}>Profile</Text>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="face-recognition" style={{ color: '#f0981a' }} size={wp('8%')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonHeader, { backgroundColor: '#48294b' }]} onPress={() => props.navigation.navigate('News')}>
              <Text style={styles.textHeader}>News</Text>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="newspaper" style={{ color: '#48294b' }} size={wp('8%')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: wp('4%') }}>Summary</Text>
          <View style={styles.rowFooter}>
            <View style={styles.containerContentFooter}>
              <View style={styles.boxFooter}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>{sisa_ayam}</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Sisa Ayam</Text>
              </View>
              <View style={styles.boxFooter}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>{afkir}</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Ayam Afkir</Text>
              </View>
              <View style={[styles.boxFooter, { borderRightWidth: 0 }]}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>{mati}</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Ayam Mati</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowFooter}>
            <View style={styles.containerContentFooter2}>
              <View style={styles.boxFooter2}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>{pakan_masuk}</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Pakan Masuk</Text>
              </View>
              <View style={styles.boxFooter2}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>{pakan_keluar}</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Pakan Keluar</Text>
              </View>
              <View style={[styles.boxFooter2, { borderRightWidth: 0 }]}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>{sisa_pakan}</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Sisa Pakan</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
  header: {
    width: wp('100%'),
    alignItems: 'center',
    padding: 20
  },
  rowHeader: {
    flexDirection: 'row'
  },
  buttonHeader: {
    width: wp('40%'),
    height: hp('20%'),
    borderRadius: 20,
    margin: wp('3%'),
  },
  icon: {
    backgroundColor: 'white',
    width: wp('20%'),
    height: wp('20%'),
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHeader: {
    color: 'white',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 20
  },
  footer: {
    width: wp('100%'),
    // alignItems: 'center',
    paddingHorizontal: wp('4%')
  },
  rowFooter: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerContentFooter: {
    backgroundColor: 'white',
    width: wp('85%'),
    flexDirection: 'row',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10
  },
  boxFooter: {
    width: wp('28%'),
    height: wp('28%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: '#f4f4f4'
  },
  circleContent: {
    backgroundColor: '#2e3850',
    width: wp('12%'),
    height: wp('12%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  containerContentFooter2: {
    backgroundColor: 'white',
    width: wp('85%'),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 2,
    borderTopColor: '#f4f4f4',
    flexDirection: 'row'
  },
  boxFooter2: {
    width: wp('28%'),
    height: wp('28%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderRightColor: '#f4f4f4'
  }
});

export default Home;
