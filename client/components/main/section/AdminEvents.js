import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';

const AdminEvents = () => {
  const containerStyle = {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  };
  
  return (
    <View style={containerStyle}>
      <Text> Events </Text>
    </View>
  );
};

export default AdminEvents;
