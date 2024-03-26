import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';

const AdminClubs = () => {
  const containerStyle = {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  };
  
  return (
    <View style={containerStyle}>
      <Text> Clubs </Text>
    </View>
  );
};

export default AdminClubs;
