/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import Axios from 'axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

const FormPeriode = (props) => {
  const [total_doc, setDoc] = useState('');
  const [no_do, setNoDo] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {colors} = useTheme();

  const handleClickSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    if (total_doc && no_do) {
      const body = {
        total_doc,
        no_do,
      };
      try {
        const res = await Axios.post(
          'https://e-chick-backend.herokuapp.com/api/periode',
          body,
          config,
        );
        setIsSuccess('success');
      } catch (error) {
        setIsSuccess('error');
      }
    }
  };

  useEffect(() => {
    isSuccess == 'success' && props.navigation.navigate('List Periode');
    isSuccess == 'error' && alert('Menambahkan Periode Gagal');
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Form untuk menambah periode baru</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          Total DOC
        </Text>
        <View style={styles.action}>
          <FontAwesome name="optin-monster" color={colors.text} size={20} />
          <TextInput
            placeholder="Total DOC Masuk"
            value={total_doc}
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={(text) => setDoc(text)}
          />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          No. DO
        </Text>
        <View style={styles.action}>
          <FontAwesome
            name="arrow-circle-o-right"
            color={colors.text}
            size={20}
          />
          <TextInput
            value={no_do}
            placeholder="Masukan No. DO"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(text) => setNoDo(text)}
          />
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
                Tambah
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
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
});

export default FormPeriode;