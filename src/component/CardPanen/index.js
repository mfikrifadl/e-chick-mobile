import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CardPanen = ({ item }) => {
  const navigation = useNavigation();
  const handleClickSubmit = async () => {
    await AsyncStorage.setItem('idPanen', JSON.stringify(item.id));
    navigation.navigate('Form Edit Panen', { id: item.id });
  };
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card} onPress={handleClickSubmit}>
        <Text style={{ alignSelf: 'flex-end', color: '#fff' }}>
          Tanggal: {item.tanggal}
        </Text>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.containerHari}>
              <Text style={styles.textHari}>{item.no}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.cardText}>
                <Text style={{ color: '#fff' }}>
                  Penerima : {item.penerima}
                </Text>
                <Text style={{ color: '#fff' }}>
                  Total Ekor : {item.total_ekor}
                </Text>
                <Text style={{ color: '#fff' }}>
                  Berat Bersh : {item.total_bersih} gram
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ alignSelf: 'flex-end', color: '#fff' }}>
            Rata rata : {item.rata_rata} gram
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardPanen;

const styles = StyleSheet.create({
  containerHari: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
  textHari: {
    fontSize: 25,
    // fontWeight: 'bold',
  },
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
