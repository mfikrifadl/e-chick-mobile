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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ListHarian = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>List Harian</Text>
      </View>
      <View style={styles.buttonButtom}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Form Harian')}>
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
});

export default ListHarian;
