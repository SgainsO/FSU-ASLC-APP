// LoginScreen.js
import React, { useState } from 'react';

import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Image, StatusBar } from 'react-native';
import {auth} from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const {width, height} = Dimensions.get('window');
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userCredential.Name = userName
      document.cookie = "authToken" + "=" + "Bearer " + userCredential.user.accessToken
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      setError(errorCode)
    });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
        document.cookie = "authToken" + "=" + "Bearer " + userCredential.user.accessToken
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setError(errorCode)
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Image source={require('../../assets/aslc_logo.png')} style= {styles.logoImage} />
      <Image source={require('../../assets/connect.png') }  style = {{marginBottom: 20}}/>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Text style={styles.errorColor} > {error} </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoImage:
  {
    margin: 15
  },
  errorColor: {
    color: 'red',
  }
});

export default LoginScreen;
