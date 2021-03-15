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
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

const Home = (props) => {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.rowHeader}>
            <TouchableOpacity style={[styles.buttonHeader, { backgroundColor: '#fd6768' }]} onPress={() => props.navigation.navigate('List Periode')}>
              <Text style={styles.textHeader}>Periode</Text>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="typewriter" style={{ color: '#fd6768' }} size={wp('8%')} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonHeader, { backgroundColor: '#109da4' }]}>
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
            <TouchableOpacity style={[styles.buttonHeader, { backgroundColor: '#48294b' }]}>
              <Text style={styles.textHeader}>Funfact</Text>
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
                  <Text style={styles.circleText}>1</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Sisa Ayam</Text>
              </View>
              <View style={styles.boxFooter}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>1</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Ayam Afkir</Text>
              </View>
              <View style={[styles.boxFooter, { borderRightWidth: 0 }]}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>1</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Ayam Mati</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowFooter}>
            <View style={styles.containerContentFooter2}>
              <View style={styles.boxFooter2}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>1</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Pakan Masuk</Text>
              </View>
              <View style={styles.boxFooter2}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>1</Text>
                </View>
                <Text style={{ marginTop: 10 }}>Pakan Keluar</Text>
              </View>
              <View style={[styles.boxFooter2, { borderRightWidth: 0 }]}>
                <View style={styles.circleContent}>
                  <Text style={styles.circleText}>1</Text>
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
