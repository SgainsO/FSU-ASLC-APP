import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';

const AdminHome = () => {
  const containerStyle = {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  };
  
  return (
    <View style={containerStyle}>
      <Text> Home </Text>
    </View>
  );
};

export default AdminHome;
