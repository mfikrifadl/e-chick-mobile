/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from '../../component';

const ListPeriode = ({navigation}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [dataTable, setDataTable] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    try {
      const res = await Axios.get(
        'https://e-chick-backend.herokuapp.com/api/periode?filter=',
        config,
      );
      setDataTable(res.data.data);
      setIsSuccess('success');
    } catch (error) {
      setIsSuccess('error');
      alert('gagal');
    }
  };

  if (dataTable.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#009387" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>List Periode</Text>
      <FlatList
        style={styles.cardContainer}
        data={dataTable}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Card item={item} />}
      />

      <View style={styles.buttonButtom}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Form Periode')}>
          <FontAwesome name="plus" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 20,
  },
});

export default ListPeriode;
