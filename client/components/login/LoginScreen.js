import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Sign in logic here
    console.log(`Logging in with username: ${username} and password: ${password}`);
  };

  const handleSignUp = () => {
    // sign up logic here
    console.log('Sign up button pressed');
  };

  const navigation = useNavigation();

  const navigate = (navigateTo) => {
    navigation.navigate(navigateTo);
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/aslc_logo.png')} style= {styles.logoImage} />
      <Image source={require('../../assets/connect.png') }  style = {{marginBottom: 20}}/>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor= '#a19f99'
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor= '#a19f99'
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText} onPress={() => navigate('Main')}>Temp Go To Home</Text>
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#F8F5E4',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#a19f99',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoImage:
  {
    margin: 15
  }
});

export default LoginScreen;