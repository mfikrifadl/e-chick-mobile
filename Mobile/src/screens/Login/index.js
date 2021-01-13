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
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
} from 'react-native';
import Axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [islogin, setIslogin] = useState(false);

  const handleClickSubmit = async () => {
    if (email && password) {
      const body = {
        email,
        password,
      };
      try {
        const res = await Axios.post(
          'https://cobaauthnative.herokuapp.com/api/auth/login',
          body,
        );
        await AsyncStorage.setItem('token', res.data.access_token);
        setIslogin('success');
      } catch (error) {
        setIslogin('error');
      }
      const token = await AsyncStorage.getItem('token');
    }
  };

  useEffect(() => {
    islogin == 'success' && props.navigation.navigate('Home');
    islogin == 'error' && alert('error');
  }, [islogin]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          value={email}
          placeholder="masukkan email"
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          secureTextEntry={true}
          placeholder="masukkan pass"
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
        <Text>{email}</Text>
        <Text>{password}</Text>
        <Button
          title="Submit"
          onPress={handleClickSubmit}
          style={styles.textInput}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    marginVertical: 10,
  },
  button: {
    margin: 10,
  },
  container: {
    margin: 10,
  },
});

export default Login;
