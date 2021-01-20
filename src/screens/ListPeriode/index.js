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
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ListPeriode = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>List Periode</Text>
      <Text>List Periode</Text>
      <Text>List Periode</Text>
      <View style={styles.buttonButtom}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Form Periode')}>
          <FontAwesome name="plus" color="#fff" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default ListPeriode;
