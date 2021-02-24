/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CardHarian} from '../../component';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ListHarian = ({navigation}) => {
  this.state = {
    dataTable: [],
  };
  const [dataTable, setDataTable] = useState('');
  const [sisa, setSisa] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await AsyncStorage.setItem('idHarian', '');
      setIsLoading(true);
      getData();
      setIsLoading(false);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const idPeriode = await AsyncStorage.getItem('idPeriode');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    try {
      const res = await Axios.get(
        'https://e-chick-backend.herokuapp.com/api/periode/' +
          idPeriode +
          '/harian',
        config,
      );
      // console.log(res.data.data.harian);
      setDataTable(Object(res.data.data.harian));
      setSisa(res.data.data.sisa);
      console.log(res.data.data.harian);
      await AsyncStorage.setItem(
        'jumlahHarian',
        JSON.stringify(res.data.data.harian.length + 1),
      );
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={styles.textSisa}>Sisa Pakan: {sisa} Sak</Text>
        <FlatList
          style={styles.cardContainer}
          data={dataTable}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CardHarian item={item} {...this.props} />}
        />
        <View style={styles.buttonButtom}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Form Harian')}>
            <FontAwesome name="plus" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  addButton: {
    backgroundColor: '#009387',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: -20,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSisa: {
    fontSize: 20,
    marginLeft: 12,
    marginBottom: 10,
  },
});

export default ListHarian;
