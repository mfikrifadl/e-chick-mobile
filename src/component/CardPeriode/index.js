import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CardPeriode = ({ item }) => {
  const navigation = useNavigation();
  const handleClickSubmit = async () => {
    await AsyncStorage.setItem('idPeriode', JSON.stringify(item.id));
    await AsyncStorage.setItem('end_date', JSON.stringify(item.end_date));
    navigation.navigate('Menu Periode');
  };
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={handleClickSubmit}>
        <Text style={{ color: '#fff' }}>
          Periode {item.created_at.substr(0, 10)} ->{' '}
          {item.end_date === null ? 'now' : item.end_date.substr(0, 10)}
        </Text>
        <View style={styles.cardText}>
          <Text style={{ color: '#fff' }}>Total Ayam : {item.total_doc}</Text>
          <Text style={{ alignSelf: 'flex-end', color: '#fff' }}>
            No DO : {item.no_do}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardPeriode;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#009387',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  cardText: {
    fontSize: 15,
  },
  cardContainer: {
    alignItems: 'center',
  },
});
