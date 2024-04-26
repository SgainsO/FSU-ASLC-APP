import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import api from '../APIUse';
const RoundedButton = ({ title, onPress, buttonStyle, textStyle, isActive, Key, ChangeDataFunction, color, opacity }) => {
  const [buttonColor, setButtonColor] = useState('white');

  const styles = StyleSheet.create({
    button: {
      borderRadius: 20, // Adjust the value to change the roundness
      borderColor: 'black',
     // backgroundColor: '#d3d3d3', // Change the background color as needed
      paddingVertical: 5,
      paddingHorizontal: 8,
      alignItems: 'center',
      backgroundColor: color,
      borderWidth: 1,
      borderColor: 'black',
      opacity: opacity
    },
    buttonWrapper: {
      borderColor: 'black',
      borderRadius: 20,
      overflow: 'hidden', // Ensure button overflow is clipped by the wrapper
    },
    activeButton: {
      backgroundColor: '#CEB888',
    },
    inactiveButton: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
    },
    text: {
      color: 'black', // Change the text color as needed
      fontSize: 12,
      fontFamily: 'Arial',
    },
  });

  const [loading, setLoadingState] = useState(null)

  async function HandleRequest()
  {
      setLoadingState(true);
      if(Key === 'ALL')
      {
        ChangeDataFunction(await api.GetAllEvents());
      }
      else
      {
      ChangeDataFunction(await api.GetEventsFromKey(Key))
      }
      setLoadingState(false);
  }

  useEffect(() => {
    HandleRequest();
  }, [])

   // State to hold button color
    const handlePress = () => {
        
      HandleRequest();

      console.log("isActiveState")
      console.log("isActive " + JSON.stringify(isActive));
      setButtonColor( title === isActive ? 'white' : '#CEB888');
      onPress && onPress(); // Invoke the provided onPress function
      };

  return (
    <View style={styles.buttonWrapper}>
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
    </View>
  );




};



export default RoundedButton;