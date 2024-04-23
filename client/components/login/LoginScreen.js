import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// TEMP BUTTON TO SEE NOTIFS
import Notification from '../notifications/Notification';

import { useAuth } from '../AuthProvider';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const navigate = (navigateTo) => {
    navigation.navigate(navigateTo);
  }
  const handleIconPress = (iconName, navigateTo) => {
    navigation.navigate(navigateTo);
};
  const { setIsAdmin, handleLogin, isLoggedIn} = useAuth();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/aslc_logo.png')} style= {styles.logoImage} />
      <Image source={require('../../assets/connect.png') }  style = {{marginBottom: 20}}/>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor= '#FFFFFF'
          value={email}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor= '#FFFFFF'
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => [isLoggedIn(), navigate("Signup")]}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setIsAdmin(false)}>
        <Text style={styles.buttonText}>Set Admin False</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => setIsAdmin(true)}>
        <Text style={styles.buttonText}>Set Admin True</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Notification />
      </TouchableOpacity>
      
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#782F40',
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
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoImage:
  {
    margin: 15
  }
});

export default LoginScreen;