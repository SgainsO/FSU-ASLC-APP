import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NewButton = ({ item, active, handleButtonPress }) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: active ? '#CEB888' : 'white' }]}
        onPress={() => handleButtonPress(item.id)}
      >
        <Text style={styles.buttonText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default NewButton;
