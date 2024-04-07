import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RoundedButton = ({ title, onPress, buttonStyle, textStyle, isActive }) => {
    const [buttonColor, setButtonColor] = useState('white'); // State to hold button color
    const handlePress = () => {
        // Change button color on press
        setButtonColor(buttonColor === 'white' ? '#CEB888' : 'white');
        onPress && onPress(); // Invoke the provided onPress function
      };

  return (
    <View style={styles.buttonWrapper}>
    <TouchableOpacity onPress={handlePress} style={[styles.button, isActive ? styles.activeButton : styles.inactiveButton,
      ]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20, // Adjust the value to change the roundness
    borderColor: 'black',
   // backgroundColor: '#d3d3d3', // Change the background color as needed
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  buttonWrapper: {
    borderColor: 'black',
    borderRadius: 20,
    overflow: 'hidden', // Ensure button overflow is clipped by the wrapper
  },
  activeButton: {
    backgroundColor: '#CEB888',
    borderWidth: 1,
    borderColor: 'black',
  },
  inactiveButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    color: 'black', // Change the text color as needed
    fontSize: 12,
    
  },
});

export default RoundedButton;