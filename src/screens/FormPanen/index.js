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
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const FormPanen = (props) => {
  const [tanggal, setTanggal] = useState('');
  const [penerima, setPenerima] = useState('');
  const [alamat_penerima, setAlamatPenerima] = useState('');
  const [keranjang, setKeranjang] = useState('0');
  const [detail_panen, setDetailPanen] = useState([{ ekor: "", brutto: "" }]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const handleInputChange = (e, index, name) => {
    const list = [...detail_panen];
    list[index][name] = e;
    setDetailPanen(list);
  };

  const handleRemoveClick = index => {
    const list = [...detail_panen];
    list.splice(index, 1);
    setDetailPanen(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setDetailPanen([...detail_panen, { ekor: "", brutto: "" }]);
  };

  const handleClickSubmit = async () => {
    setIsSuccess('');
    const token = await AsyncStorage.getItem('token');
    const idPeriode = await AsyncStorage.getItem('idPeriode');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (tanggal && keranjang) {
      const body = {
        tanggal,
        keranjang, penerima, alamat_penerima, detail_panen
      };
      try {
        setIsLoading(true);
        const res = await Axios.post(
          'https://e-chick-backend.herokuapp.com/api/panen/' + idPeriode,
          body,
          config,
        );
        setIsLoading(false);
        setIsSuccess('success');
      } catch (error) {
        console.log(error);
        setIsSuccess('error');
      }
    }
  };

  useEffect(() => {
    isSuccess == 'success' && props.navigation.navigate('List Panen');
    isSuccess == 'error' && alert('Menambahkan Panen Gagal');
  }, [isSuccess]);

  if (isLoading === true) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#009387" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Form untuk menambah Panen baru</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.form}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                  },
                ]}>
                Tanggal
              </Text>
              <View style={styles.action}>
                <DatePicker
                  placeholder="Tanggal"
                  date={tanggal}
                  mode="date"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  placeholderTextColor="#666666"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginRight: wp('5%'),
                    },
                  }}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  autoCapitalize="none"
                  onDateChange={(text) => setTanggal(text)}
                />
              </View>
            </View>
            <View>
              <View style={styles.form}>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      color: colors.text,
                    },
                  ]}>
                  Keranjang (Kg)
                </Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="Keranjang"
                    value={keranjang}
                    placeholderTextColor="#666666"
                    keyboardType="numeric"
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    autoCapitalize="none"
                    onChangeText={(text) => setKeranjang(text)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.form}>
              <Text
                style={[
                  styles.text_footer,
                  {
                    color: colors.text,
                  },
                ]}>
                Penerima
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Penerima"
                  value={penerima}
                  placeholderTextColor="#666666"
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                  autoCapitalize="none"
                  onChangeText={(text) => setPenerima(text)}
                />
              </View>
            </View>
            <View>
              <View style={styles.form}>
                <Text
                  style={[
                    styles.text_footer,
                    {
                      color: colors.text,
                    },
                  ]}>
                  Alamat Penerima
                </Text>
                <View style={styles.action}>
                  <TextInput
                    placeholder="Alamat Penerima"
                    value={alamat_penerima}
                    placeholderTextColor="#666666"
                    style={[
                      styles.textInput,
                      {
                        color: colors.text,
                      },
                    ]}
                    autoCapitalize="none"
                    onChangeText={(text) => setAlamatPenerima(text)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                  marginTop: 20
                },
              ]}>
              Input Hasil Panen
            </Text>
            {detail_panen.map((x, i) => {
              return (
                <View style={styles.box}>
                  <TextInput
                    placeholder="Input Ekor"
                    name="ekor"
                    keyboardType="numeric"
                    value={x.ekor}
                    placeholderTextColor="#666666"
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={(text) => handleInputChange(text, i, 'ekor')}
                  />
                  <TextInput
                    placeholder="Input Brutto (Kg)"
                    name="brutto"
                    value={x.brutto}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    onChangeText={(text) => handleInputChange(text, i, 'brutto')}
                  />
                  <View style={styles.buttonBox}>
                    {detail_panen.length !== 1 && <TouchableOpacity
                      style={{ padding: 10, backgroundColor: 'red', width: wp('7%'), height: wp('7%'), alignItems: 'center', marginRight: 10 }}
                      onPress={() => handleRemoveClick(i)}><Text>-</Text></TouchableOpacity>}
                    {detail_panen.length - 1 === i && <TouchableOpacity style={{ padding: 10, backgroundColor: 'green', width: wp('7%'), height: wp('7%'), alignItems: 'center' }} onPress={handleAddClick}><Text>+</Text></TouchableOpacity>}
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handleClickSubmit}>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Simpan
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View >
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row'
  },
  buttonBox: {
    flexDirection: 'row'
  },
  input: {
    width: wp('35%'),
    borderBottomColor: 'green',
    color: 'black',
    borderBottomWidth: 1,
    marginRight: wp('2%')
  },
  form: {
    flexDirection: 'column',
    width: wp('45%')
  },
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 50,
  },
  footer: {
    flex: 25,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FormPanen;
