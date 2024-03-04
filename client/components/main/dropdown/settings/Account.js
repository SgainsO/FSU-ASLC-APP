import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();

  const [activeIcon, setActiveIcon] = useState("Home");

  const handleIconPress = (iconName, navigateTo) => {
    setActiveIcon(iconName);
    navigation.navigate(navigateTo);
  };
  const WordWithLineBlue = ({ word, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.wordB}>{word}</Text>
        <View style={styles.line} />
      </View>
      </TouchableOpacity>
    );
  };
  const WordWithLineRed = ({ word, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.wordR}>{word}</Text>
        <View style={styles.line} />
      </View>
      </TouchableOpacity>
    );
  };
  return (
    
    <View>
      <TouchableOpacity onPress={() => handleIconPress('Sett', 'Sett')} >
        <Text style={styles.back}>{'< Back'}</Text>
      </TouchableOpacity>
    
      <View style={styles.centeredContainer}>
      <Text style={styles.Title}>Account</Text>
        {/* First Image */}
        <Image source={require('../../../assets/daniel.png')} style={styles.image} />

        {/* Second Image (Overlayed) */}
        <Image source={require('../../../assets/pencil.png')} style={[styles.image, styles.overlay]} />
      </View>

      <View>
      <WordWithLineBlue word="" ></WordWithLineBlue>
      <WordWithLineBlue word="Change Username" ></WordWithLineBlue>
      <WordWithLineBlue word="Change Password" ></WordWithLineBlue>
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
  },
  wordB: {
    fontSize: 26,
    marginBottom: 5,
    marginLeft: 20,
    marginTop: 10,
    color: '#007AFF',
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
});

export default Account;
