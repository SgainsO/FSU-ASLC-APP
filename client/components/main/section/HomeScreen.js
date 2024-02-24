import { View, FlatList, Text, } from 'react-native';
import React from 'react';

const HomeScreen = () => {
  const getTodayDate = () => {
    const currentDate = new Date();
    const format = {weekday: 'long', month: '2-digit', day: '2-digit', year: '2-digit'};
    const finalFormat = currentDate.toLocaleDateString('en-US', format);
    return finalFormat;
  };

  const containerStyle = {
    flex: 12,
    backgroundColor: 'white',
  };

  const textStyle = {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  };

  const rowStyle = {
    flex: 1,
    justifyContent: "space-around",
    marginHorizontal: 25,
    marginVertical: 10,
  };

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        Today is...{'\n'}
        {getTodayDate()}
      </Text>
      <Text> Home </Text>
    </View>
  );
};

export default HomeScreen;
