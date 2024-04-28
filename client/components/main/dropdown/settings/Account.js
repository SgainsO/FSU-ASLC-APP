import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorSchemeContext } from '../../../main/ColorSchemeContext';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useAuth } from '../../../AuthProvider';

const Account = () => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();
  const navigation = useNavigation();

  const [activeIcon, setActiveIcon] = useState("Home");

  const handleIconPress = (iconName, navigateTo) => {
    setActiveIcon(iconName);
    navigation.navigate(navigateTo);
  };

  const { setIsAdmin} = useAuth()


  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue('image', result.assets[0].uri);
    } else {
      setImage(props.data?.[0] ?? defaultImg);
      setValue('image', result.assets[0].uri);
    }
  };

  const toggleAdminStatus = () => {
    setIsAdmin(prevState => !prevState)
  };

  const WordWithLineBlue = ({ word, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.wordB}>{word}</Text>
        <View style={[styles.line, colorScheme === 'dark' && styles.whiteLine]} />
      </View>
      </TouchableOpacity>
    );
  };
  const WordWithLineRed = ({ word, onPress }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.wordR}>{word}</Text>
        <View style={[styles.line, colorScheme === 'dark' && styles.whiteLine]} />
      </View>
      </TouchableOpacity>
      </View>
    );
  };
  return (
    
    <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <TouchableOpacity onPress={() => handleIconPress('Sett', 'Sett')} >
        <Text style={styles.back}>{'< Back'}</Text>
      </TouchableOpacity>
    
      <View style={styles.centeredContainer}>
        <Text style={[styles.Title, colorScheme === 'dark' && styles.darkText]}>Account</Text>
        {/* Conditionally render the user-uploaded image if available */}

        {image ? (
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.image} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <Image source={require('../../../../assets/daniel.png')} style={styles.image} />
          </TouchableOpacity>
        )}


        {/* Second Image (Overlayed) */}
        <Image source={require('../../../../assets/pencil.png')} style={[styles.image, styles.overlay]} />
        
      </View>

      <View>
        <WordWithLineBlue word="" ></WordWithLineBlue>
        <WordWithLineBlue word="Change Username" ></WordWithLineBlue>
        <WordWithLineBlue word="Change Password" ></WordWithLineBlue>
        <WordWithLineBlue word="Admin Status" onPress={toggleAdminStatus}></WordWithLineBlue>
        <WordWithLineRed word="Deactivate Account" ></WordWithLineRed>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
    Title: {
        alignItems: 'center',
        fontSize: 42,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
    },
  containerR: {
    alignItems: 'center',
    marginVertical: 0,
    color: 'red',
  },
  containerB: {
    alignItems: 'center',
    marginVertical: 0,
    color: '#007AFF',
  },
  centeredContainer: {
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 100,
    resizeMode: 'cover',
    marginTop: 20, // Adjust the margin or padding as needed
  },
  wordR: {
    fontSize: 26,
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 10,
    color: 'red',
    fontFamily: 'Arial',
  },
  wordB: {
    fontSize: 26,
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 10,
    color: '#007AFF',
    fontFamily: 'Arial',
  },
  back: {
    fontSize: 20,
    color: '#007AFF',
    marginLeft: 5,
    fontWeight: 'bold',
    marginTop: 5,
  },
  overlay: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 165,
    left: 235,
    opacity: 2,
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '100%', // Adjust the width of the line as needed
    marginVertical: 10,
  },
  whiteLine: {
    height: 1,
    backgroundColor: 'white',
    width: '100%', // Adjust the width of the line as needed
    marginVertical: 10,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#FFFFFF',
  },
});

export default Account;
