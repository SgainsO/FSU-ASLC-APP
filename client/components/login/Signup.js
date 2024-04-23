import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// TEMP BUTTON TO SEE NOTIFS
import Notification from '../notifications/Notification';

import { useAuth } from '../AuthProvider';

const {width, height} = Dimensions.get('window');

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const navigate = (navigateTo) => {
    navigation.navigate(navigateTo);
  }

  const handleIconPress = (iconName, navigateTo) => {
    setActiveIcon(iconName);
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
          placeholder="First Name"
          placeholderTextColor= '#FFFFFF'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor= '#FFFFFF'
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor= '#FFFFFF'
          value={email}
          onChangeText={(text) => setEmail(text)}
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

      <TouchableOpacity style={styles.button} onPress={() => isLoggedIn()}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ffffff',
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

export default Signup;