import React, { useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';

const AdminUsers = () => {
  const containerStyle = {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  };
  
  return (
    <View style={containerStyle}>
      <Text> Users </Text>
    </View>
  );
};

export default AdminUsers;
