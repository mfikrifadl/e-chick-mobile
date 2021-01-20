import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.card}>
        <Text style={{color: '#fff'}}>
          Periode {props.item.created_at.substr(0, 10)} ->{' '}
          {props.item.end_date === null
            ? 'now'
            : props.item.end_date.substr(0, 10)}
        </Text>
        <View style={styles.cardText}>
          <Text style={{color: '#fff'}}>
            Total Ayam : {props.item.total_doc}
          </Text>
          <Text style={{alignSelf: 'flex-end', color: '#fff'}}>
            No DO : {props.item.no_do}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

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
