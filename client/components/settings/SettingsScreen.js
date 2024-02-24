import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContext } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const SettingsScreen = () => {
  const navigation = useContext(NavigationContext);

  return (
    <View style={styles.container}>
      <Text> Settings </Text>
    </View>
  );
};

export default SettingsScreen;