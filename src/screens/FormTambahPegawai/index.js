/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, Component } from 'react';
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
  ScrollView,
} from 'react-native';
import Axios from 'axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

const FormTambahPegawai = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  const handleClickSubmit = async () => {
    setIsSuccess('');
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    if (
      name &&
      email &&
      password
    ) {
      const body = {
        name,
        email,
        password,
      };
      try {
        setIsLoading(true);
        const res = await Axios.post(
          'https://e-chick-backend.herokuapp.com/api/auth/register',
          body,
          config,
        );
        setIsLoading(false);
        setIsSuccess('success');
      } catch (error) {
        setIsSuccess('error');
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    isSuccess == 'success' && props.navigation.navigate('Akun');
    isSuccess == 'error' && alert('Menambahkan Pegawai Gagal');
  }, [isSuccess]);

  if (isLoading === true) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#009387" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Form Tambah Pegawai</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            Nama
          </Text>
          <View style={styles.action}>
            <FontAwesome name="optin-monster" color={colors.text} size={20} />
            <TextInput
              placeholder="Nama Pegawai"
              value={name}
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
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
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome
              name="arrow-circle-o-right"
              color={colors.text}
              size={20}
            />
            <TextInput
              value={email}
              placeholder="Masukan Email"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
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
            Password
          </Text>
          <View style={styles.action}>
            <FontAwesome
              name="arrow-circle-o-right"
              color={colors.text}
              size={20}
            />
            <TextInput
              value={password}
              placeholder="Masukan Password"
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
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
      </ScrollView>
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
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FormTambahPegawai;
